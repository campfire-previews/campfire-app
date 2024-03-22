import { useState, useReducer } from "react";
import Toolbox from "./Toolbox.jsx";
import ConversationModal from "./ConversationModal.jsx";
import RecordingModal from "./RecordingModal.jsx";
import ScreenshotModal from "./ScreenshotModal.jsx"; 
import RecordingInterface from "./RecordingInterface";

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

function FeedbackInterface({ repo, issue_number, comments, onCreateComment, iFrameRef }) {
	const [ state, dispatchModals ] = useReducer(reducer, {...initialState});
	const [ isRecording, setIsRecording ] = useState(false);

	const handleHideModal = () => {
		dispatchModals({ type: "hide-all-modals" });
	}

	const handleStartRecording = (e) => {
		dispatchModals({ type: "hide-all-modals" });
		setIsRecording(true);
	}

	const handleStopRecording = (e) => {
		setIsRecording(false);
	} 

  return (
		<>
			<Toolbox 
				dispatchModals={dispatchModals} 
				handleStartRecording={handleStartRecording}
			/>

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
					iFrameRef={iFrameRef}
			/> : null }

			{ isRecording ? 
				<RecordingInterface 
					handleStopRecording={handleStopRecording}
			/> : null }
		</>
  );
}

export default FeedbackInterface;