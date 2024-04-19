import { useReducer, useEffect, useState, createContext } from "react";
import Toolbox from "./Toolbox.jsx";
import NameModal from "./NameModal.jsx";
import ConversationModal from "./ConversationModal.jsx";
import api from "../apiClient.js";
import RecordingInterface from "./RecordingInterface.jsx";
import NameBanner from "./NameBanner.jsx";
import AdBlockerMessage from "./AdBlockerMessage.jsx";
import getUserData from "../utils/getUserData.js";
import removeBotComments from "../utils/removeBotComments.js";

const SUBDOMAIN = import.meta.env.VITE_SUBDOMAIN;
const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;
export const SessionReplayContext = createContext();
let events = [];

const initialState = {
  isConversationModalVisible: false,
  isRecordingModalVisible: false,
  isNameModalVisible: false,
  userName: "",
  recordingModalLoaded: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "display-conversation-modal":
      return {
        ...state,
        isConversationModalVisible: true,
        isRecordingModalVisible: false,
        isNameModalVisible: false,
      };
    case "display-recording-modal":
      return {
        ...state,
        isConversationModalVisible: false,
        isRecordingModalVisible: true,
        isNameModalVisible: false,
      };
    case "hide-all-modals":
      return {
        ...state,
        isConversationModalVisible: false,
        isRecordingModalVisible: false,
        isNameModalVisible: false,
      };
    case "toggle-name-modal":
      return { ...state, isNameModalVisible: !state.isNameModalVisible };
    case "set-user-name":
      return { ...state, userName: action.payload, isNameModalVisible: false };
    case "recording-modal-loaded":
      return { ...state, recordingModalLoaded: action.payload };
    default:
      throw new Error(`The action for ${action.type} does not exist.`);
  }
}

function FeedbackInterface({ repo, issue_number, iFrameRef }) {
  const [state, dispatchModals] = useReducer(reducer, { ...initialState });
  const [isRecording, setIsRecording] = useState(false);
  const [RecordingModal, setRecordingModal] = useState(null);
  const [showAdBlockerMessage, setShowAdBlockerMessage] = useState(false);
  const [sessionReplayId, setSessionReplayId] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserData();
    (async () => {
      let comments = await api.getComments(repo, issue_number);
      const filteredComments = removeBotComments(comments);
      setComments(filteredComments);
    })();
  }, [repo, issue_number]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      dispatchModals({ type: "set-user-name", payload: userName });
    } else {
      dispatchModals({ type: "toggle-name-modal" });
    }

    import("./RecordingModal.jsx")
      .then((module) => {
        setRecordingModal(() => module.default);
        dispatchModals({ type: "recording-modal-loaded", payload: true });
      })
      .catch((error) => {
        console.error("Failed to load RecordingModal:", error);
        setShowAdBlockerMessage(true);
      });
  }, [state.isRecordingModalVisible]);

  const handleNameSubmit = (name) => {
    localStorage.setItem("userName", name);
    dispatchModals({ type: "set-user-name", payload: name });
  };

  const toggleModal = () => {
    dispatchModals({ type: "toggle-name-modal" });
  };

  const handleHideModal = () => {
    dispatchModals({ type: "hide-all-modals" });
  };

  const handleCreateComment = async (newComment, LGTM = false) => {
    const commentData = {
      user: localStorage.getItem("userName"),
      comment: newComment,
      LGTM,
      userData: getUserData(),
    };

    const data = await api.sendComment(repo, issue_number, commentData);
    setComments((prevState) => prevState.concat(data));
  };

  const handleStartRecording = () => {
    events = [];
    dispatchModals({ type: "hide-all-modals" });
    setIsRecording(true);

    import("rrweb")
      .then((rrwebModule) => {
        const rrweb = rrwebModule.default || rrwebModule;
        const stopFn = rrweb.record({
          emit(event) {
            // console.log(event);
            events.push(event);
          },
          recordCrossOriginIframes: true,
        });

        window.stopRecording = stopFn;

        // the second argument for postMessage is the 'targetOrigin'
        // eventually, the targetOrigin should be "https://CLIENT-APP-PR.preview.CLIENT_DOMAIN"
        const URL_PATHNAME = window.location.pathname;
        iFrameRef.current.contentWindow.postMessage(
          URL_PATHNAME,
          `https://${repo}-${issue_number}.${SUBDOMAIN}.${USER_DOMAIN}`
        );
      })
      .catch((error) => {
        console.error("Failed to load rrweb:", error);
      });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (window.stopRecording) {
      window.stopRecording();
      dispatchModals({ type: "display-recording-modal" });
    }
  };

  const handleSendRecording = async () => {
    const id = await api.saveSessionReplay(repo, issue_number, events);
    setSessionReplayId(id);
    console.log(id);
    dispatchModals({ type: "display-conversation-modal" });
  };
  return (
    <>
      {showAdBlockerMessage && <AdBlockerMessage />}
      <div id="NameRecordingWrapper">
        {state.userName ? (
          <NameBanner userName={state.userName} onClick={toggleModal} />
        ) : null}

        {isRecording ? (
          <RecordingInterface handleStopRecording={handleStopRecording} />
        ) : null}
      </div>

      {state.isNameModalVisible ? (
        <NameModal
          isVisible={state.isNameModalVisible}
          onSubmit={handleNameSubmit}
          defaultName={state.userName}
        />
      ) : (
        <Toolbox
          handleStartRecording={handleStartRecording}
          dispatchModals={dispatchModals}
          onCreateComment={handleCreateComment}
          repo={repo}
          issue_number={issue_number}
        />
      )}

      {state.isConversationModalVisible ? (
        <SessionReplayContext.Provider
          value={{ sessionReplayId, setSessionReplayId }}
        >
          <ConversationModal
            onHideModal={handleHideModal}
            onCreateComment={handleCreateComment}
            comments={comments}
          />
        </SessionReplayContext.Provider>
      ) : null}

      {state.isRecordingModalVisible ? (
        <RecordingModal
          onHideModal={handleHideModal}
          events={events}
          onSendRecording={handleSendRecording}
        />
      ) : null}
    </>
  );
}

export default FeedbackInterface;
