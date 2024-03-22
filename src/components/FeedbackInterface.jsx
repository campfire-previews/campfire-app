import { useReducer, useEffect, useState } from "react";
import Toolbox from "./Toolbox.jsx";
import NameModal from "./NameModal.jsx";
import ConversationModal from "./ConversationModal.jsx";
import RecordingModal from "./RecordingModal.jsx";
import RecordingInterface from "./RecordingInterface";
import ScreenshotModal from "./ScreenshotModal.jsx";
import NameBanner from "./NameBanner.jsx";
import * as rrweb from "rrweb";
import "rrweb-player/dist/style.css";
const SUBDOMAIN = import.meta.env.VITE_SUBDOMAIN;
const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;
let events = [];
let stopFn;

const initialState = {
  isConversationModalVisible: false,
  isScreenshotModalVisible: false,
  isRecordingModalVisible: false,
  isModalVisible: true,
  userName: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "display-conversation-modal":
      return {
        isConversationModalVisible: true,
        isScreenshotModalVisible: false,
        isRecordingModalVisible: false,
      };
    case "display-screenshot-modal":
      return {
        isConversationModalVisible: false,
        isScreenshotModalVisible: true,
        isRecordingModalVisible: false,
      };
    case "display-recording-modal":
      return {
        isConversationModalVisible: false,
        isScreenshotModalVisible: false,
        isRecordingModalVisible: true,
      };
    case "hide-all-modals":
      return {
        isConversationModalVisible: false,
        isScreenshotModalVisible: false,
        isRecordingModalVisible: false,
      };
    case "toggle-name-modal":
      console.log("toggle-name-modal");
      return { ...state, isModalVisible: !state.isModalVisible };
    case "set-user-name":
      return { ...state, userName: action.payload, isModalVisible: false };
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

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    console.log("USE EFFECT ", userName);
    if (userName) {
      dispatchModals({ type: "set-user-name", payload: userName });
    } else {
      dispatchModals({ type: "toggle-name-modal" });
    }
  }, []);

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

  const handleStartRecording = (e) => {
    events = [];
    dispatchModals({ type: "hide-all-modals" });
    setIsRecording(true);
    stopFn = new rrweb.record({
      emit(event) {
        console.log(event);
        events.push(event);
      },
      recordCrossOriginIframes: true,
    });

    // the second argument for postMessage is the 'targetOrigin'
    // eventually, the targetOrigin should be "https://CLIENT-APP-PR.preview.CLIENT_DOMAIN"
    const URL_PATHNAME = window.location.pathname;
    iFrameRef.current.contentWindow.postMessage(
      URL_PATHNAME,
      "http://localhost:5174"
    );
    iFrameRef.current.contentWindow.postMessage(
      URL_PATHNAME,
      `https://${repo}-${issue_number}.${SUBDOMAIN}.${USER_DOMAIN}`
    );
  };

  const handleStopRecording = (e) => {
    setIsRecording(false);
    stopFn();
    dispatchModals({ type: "display-recording-modal" });
  };

  return (
    <>
      { state.userName ?
				<DisplayNameBanner userName={state.userName} onClick={toggleModal} />
			}
      
			{state.isModalVisible ? (
        <NameModal
          isVisible={state.isModalVisible}
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
        <ConversationModal
          onHideModal={handleHideModal}
          onCreateComment={onCreateComment}
          comments={comments}
        />
      ) : null}

      {state.isScreenshotModalVisible ? (
        <ScreenshotModal onHideModal={handleHideModal} />
      ) : null}

      {state.isRecordingModalVisible ? (
        <RecordingModal onHideModal={handleHideModal} events={events} />
      ) : null}

      {isRecording ? (
        <RecordingInterface handleStopRecording={handleStopRecording} />
      ) : null}
    </>
  );
}

export default FeedbackInterface;
