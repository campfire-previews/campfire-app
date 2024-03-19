import { useState, useReducer } from "react";
import Toolbox from "./Toolbox.jsx";
import ben from "../../ben/ben.js";

import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';

import ConversationModal from "./ConversationModal.jsx";
import RecordingModal from "./RecordingModal.jsx";
import ScreenshotModal from "./ScreenshotModal.jsx"; 

const initialState = {
	isConversationModalVisible: false,
	isScreenshotModalVisible: false,
	isRecordingModalVisible: false,
}

function reducer(state, action) {
	console.log("action", action);
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

function FeedbackInterface({ repo, issue_number, comments, setComments }) {
	const [ state, dispatchModals ] = useReducer(reducer, {...initialState});

  // const [convoState, convoDispatch] = useReducer(reducer, {...initialState});
  // const [screenshotState, screenshotDispatch] = useReducer(reducer, {...initialState});
  // const [recordingState, recordingDispatch] = useReducer(reducer, {...initialState});
	const onHideModal = () => {
		dispatchModals({ type: "hide-all-modals" });
	}
	
  const [newComment, setNewComment] = useState("");

  const onCreateComment = async (e) => {
    e.preventDefault();
    await ben.postComment(repo, issue_number, newComment);
    setNewComment("");
    ben.getComments(repo, issue_number).then(setComments);
  };

	const tools = [
	  { 
			icon: <VideocamIcon />,
      name: 'New session replay',
      onClick() { dispatchModals({ type: "display-recording-modal" }) } 
    },
	  {
      icon: <CameraAltIcon />,
      name: 'New screenshot',
      onClick() { dispatchModals({ type: "display-screenshot-modal" }) } 
    },
		{
      icon: <ForumIcon />,
      name: 'View conversation',
      onClick() { dispatchModals({ type: "display-conversation-modal" }) } 
    },
	  {
      icon: <ShareIcon />,
      name: 'Share link'
    },
	  {
      icon: <ThumbUpIcon />,
      name: 'Looks good to me!'
    },
	];

	console.log(state);
  return (
		<>
			<Toolbox tools={tools}/>

			{ state.isConversationModalVisible ? 
				<ConversationModal 
					onHideModal={onHideModal}
			/> : null }

			{ state.isScreenshotModalVisible ? 
				<ScreenshotModal
					onHideModal={onHideModal}
			/> : null }
			
			{ state.isRecordingModalVisible ? 
				<RecordingModal 
					onHideModal={onHideModal}
			/> : null }
		</>
  );
}

export default FeedbackInterface;