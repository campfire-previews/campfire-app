import { useState, useReducer } from "react";
import Toolbox from "./Toolbox.jsx";
import ConversationModal from "./ConversationModal.jsx";
import RecordingModal from "./RecordingModal.jsx";
import ScreenshotModal from "./ScreenshotModal.jsx"; 
import RecordingInterface from "./RecordingInterface";

import * as rrweb from "rrweb";
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

let events = [];
let stopFn;

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
		events = [];
		dispatchModals({ type: "hide-all-modals" });
		setIsRecording(true);
		stopFn = new rrweb.record({
			emit(event) {
				console.log(event)
				events.push(event);
			},
			recordCrossOriginIframes: true,
		});

		// the second argument for postMessage is the 'targetOrigin'
		// eventually, the targetOrigin should be "https://CLIENT-APP-PR.preview.CLIENT_DOMAIN"
		const URL_PATHNAME = window.location.pathname;
		iFrameRef.current.contentWindow.postMessage(URL_PATHNAME, 'http://localhost:5174');
	}

	const handleStopRecording = (e) => {
		setIsRecording(false);
		stopFn();
		dispatchModals({ type: "display-recording-modal" });
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
					events={events}
			/> : null }

			{ isRecording ? 
				<RecordingInterface 
					handleStopRecording={handleStopRecording}
			/> : null }
		</>
  );
}

export default FeedbackInterface;