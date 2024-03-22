import { useReducer, useEffect, useState } from "react";
import Toolbox from "./Toolbox.jsx";
import NameModal from "./NameModal.jsx";
import ConversationModal from "./ConversationModal.jsx";
import RecordingModal from "./RecordingModal.jsx";
import ScreenshotModal from "./ScreenshotModal.jsx";
import DisplayNameBanner from "./DisplayNameBanner.jsx";

const initialState = {
  isConversationModalVisible: false,
  isScreenshotModalVisible: false,
  isRecordingModalVisible: false,
	isModalVisible: true,
  userName: '',
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
			return { ...state, isModalVisible: !state.isModalVisible };
		case "set-user-name":
			return { ...state, userName: action.payload, isModalVisible: false };
    default:
      throw new Error(`The action for ${action.type} does not exist.`);
  }
}

function FeedbackInterface({ repo, issue_number, comments, onCreateComment }) {
  const [state, dispatchModals] = useReducer(reducer, { ...initialState });

	useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      dispatchModals({ type: 'set-user-name', payload: userName });
    } else {
      dispatchModals({ type: 'toggle-name-modal' });
    }
  }, []);

  const handleNameSubmit = (name) => {
    localStorage.setItem('userName', name);
    dispatchModals({ type: 'set-user-name', payload: name });
  };

  const toggleModal = () => {
    dispatchModals({ type: 'toggle-name-modal' });
  };

  const handleHideModal = () => {
    dispatchModals({ type: "hide-all-modals" });
  };

  return (
		<>
			<DisplayNameBanner userName={state.userName} onClick={toggleModal} />
      {state.isModalVisible ? (
      <NameModal isVisible={state.isModalVisible} onSubmit={handleNameSubmit} defaultName={state.userName} />
      ) : (
			<Toolbox
				dispatchModals={dispatchModals}
				onCreateComment={onCreateComment}
				repo={repo}
				issue_number={issue_number}
			/>
      )}
			{state.isConversationModalVisible ? 
				<ConversationModal 
					onHideModal={handleHideModal}
					onCreateComment={onCreateComment}
					comments={comments}
			/> : null }

      {state.isScreenshotModalVisible ? (
        <ScreenshotModal onHideModal={handleHideModal} />
      ) : null}

      {state.isRecordingModalVisible ? (
        <RecordingModal onHideModal={handleHideModal} />
      ) : null}
    </>
  );
}

export default FeedbackInterface;
