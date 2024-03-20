import { useReducer } from "react";
import Toolbox from "./Toolbox.jsx";
import ConversationModal from "./ConversationModal.jsx";
import RecordingModal from "./RecordingModal.jsx";
import ScreenshotModal from "./ScreenshotModal.jsx"; 

const initialState = {
	isConversationModalVisible: false,
	isScreenshotModalVisible: false,
	isRecordingModalVisible: false,
}

function reducer(state, action) {
  switch(action.type) {
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
    default:
      throw new Error(`The action for ${action.type} does not exist.`);
  }
}

function FeedbackInterface({ repo, issue_number, comments, onCreateComment }) {
	const [ state, dispatchModals ] = useReducer(reducer, {...initialState});

	const handleHideModal = () => {
		dispatchModals({ type: "hide-all-modals" });
	}

  return (
		<>
			<Toolbox dispatchModals={dispatchModals}/>

			{ state.isConversationModalVisible ? 
				<ConversationModal 
					onHideModal={handleHideModal}
					onCreateComment={onCreateComment}
					comments={comments}
			/> : null }

			{ state.isScreenshotModalVisible ? 
				<ScreenshotModal
					onHideModal={handleHideModal}
			/> : null }
			
			{ state.isRecordingModalVisible ? 
				<RecordingModal 
					onHideModal={handleHideModal}
			/> : null }
		</>
  );
}

export default FeedbackInterface;