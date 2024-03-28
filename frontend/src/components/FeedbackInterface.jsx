import { useReducer, useEffect, useState, createContext } from "react";
import Toolbox from "./Toolbox.jsx";
import NameModal from "./NameModal.jsx";
import ConversationModal from "./ConversationModal.jsx";
import api from "../apiClient.js";
import RecordingInterface from "./RecordingInterface";
import NameBanner from "./NameBanner.jsx";
import AdBlockerMessage from "./AdBlockerMessage";

const SUBDOMAIN = import.meta.env.VITE_SUBDOMAIN;
const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;
export const SessionReplayIdContext = createContext();
let events = [];

const initialState = {
  isConversationModalVisible: false,
  isScreenshotModalVisible: false,
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
        isScreenshotModalVisible: false,
        isRecordingModalVisible: false,
        isNameModalVisible: false,
      };
    case "display-recording-modal":
      return {
        ...state,
        isConversationModalVisible: false,
        isScreenshotModalVisible: false,
        isRecordingModalVisible: true,
        isNameModalVisible: false,
      };
    case "hide-all-modals":
      return {
        ...state,
        isConversationModalVisible: false,
        isScreenshotModalVisible: false,
        isRecordingModalVisible: false,
        isNameModalVisible: false,
      };
    case "toggle-name-modal":
      console.log("toggle-name-modal");
      return { ...state, isNameModalVisible: !state.isNameModalVisible };
    case "set-user-name":
      return { ...state, userName: action.payload, isNameModalVisible: false };
    case "recording-modal-loaded":
      return { ...state, recordingModalLoaded: action.payload };
    default:
      throw new Error(`The action for ${action.type} does not exist.`);
  }
}

function FeedbackInterface({
  repo,
  issue_number,
  comments,
  onCreateComment,
  iFrameRef,
}) {
  const [state, dispatchModals] = useReducer(reducer, { ...initialState });
  const [isRecording, setIsRecording] = useState(false);
  const [RecordingModal, setRecordingModal] = useState(null); // state for dynamically loaded component
  const [showAdBlockerMessage, setShowAdBlockerMessage] = useState(false);
  const [sessionReplayId, setSessionReplayId] = useState(null);
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    console.log("USE EFFECT ", userName);
    if (userName) {
      dispatchModals({ type: "set-user-name", payload: userName });
    } else {
      dispatchModals({ type: "toggle-name-modal" });
    }

    // dynamic import for RecordingModal
    import("./RecordingModal.jsx")
      .then((module) => {
        console.log("importing RecordingModal...");
        // dynamically load rrweb-player CSS
        // const link = document.createElement('link');
        // link.href = 'rrweb-player/dist/style.css';
        // link.type = 'text/css';
        // link.rel = 'stylesheet';
        // document.head.appendChild(link);
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

        // Save stop function for later use
        window.stopRecording = stopFn;

        // the second argument for postMessage is the 'targetOrigin'
        // eventually, the targetOrigin should be "https://CLIENT-APP-PR.preview.CLIENT_DOMAIN"
        const URL_PATHNAME = window.location.pathname;
        // iFrameRef.current.contentWindow.postMessage(
        //   URL_PATHNAME,
        //   "http://localhost:5174"
        // );
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
      <div id="miscOverlay">
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
          onCreateComment={onCreateComment}
          repo={repo}
          issue_number={issue_number}
        />
      )}

      {state.isConversationModalVisible ? (
        <SessionReplayIdContext.Provider value={sessionReplayId}>
          <ConversationModal
            onHideModal={handleHideModal}
            onCreateComment={onCreateComment}
            comments={comments}
          />
        </SessionReplayIdContext.Provider>
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
