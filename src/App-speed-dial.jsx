import { useState, useEffect } from 'react';

import './App.css'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { createTheme } from '@mui/material/styles';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import racheleURL from "./assets/racheleMEOW.png";


function BasicSpeedDial({ actions }) {
  return (
    <SpeedDial
			className="speedDial"
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1}}
      icon={<SpeedDialIcon/>}
			FabProps={{
				style: {
					backgroundColor: "#BA1B1D",
					'&:hover': {
        		backgroundColor: '#BA1B1D',
      		}
				},
			}}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
					onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
}

function ConversationModal({ setIsConversationModalVisible }) {
	const onModalOverlayClick = (e) => {
		setIsConversationModalVisible(false);
	}

	return (
		<>
			<div className="modalContainer">
				<p>Conversation Modal</p>
				<img src="https://i.kym-cdn.com/entries/icons/original/000/034/467/Communist_Bugs_Bunny_Banner.jpg"/>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

function ScreenshotModal({ setIsScreenshotModalVisible }) {
	const onModalOverlayClick = (e) => {
		setIsScreenshotModalVisible(false);
	}

	return (
		<>
			<div className="modalContainer">
				<p>Screenshot Modal</p>
				<img src={racheleURL}/>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

function RecordingModal({ setIsRecordingModalVisible }) {
	const onModalOverlayClick = (e) => {
		setIsRecordingModalVisible(false);
	}

	return (
		<>
			<div className="modalContainer">
				<p>Session Replay Modal</p>
				<iframe src="https://giphy.com/embed/26gspipWnu59srmM0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}


function App() {
	const [ isConversationModalVisible, setIsConversationModalVisible ] = useState(false);
	const [ isScreenshotModalVisible, setIsScreenshotModalVisible ] = useState(false);
	const [ isRecordingModalVisible, setIsRecordingModalVisible ] = useState(false);

	const onConversationClick = (e) => {
		setIsConversationModalVisible(true);
	}

	const onScreenshotClick = (e) => {
		setIsScreenshotModalVisible(true);
	}

	const onRecordingClick = (e) => {
		setIsRecordingModalVisible(true);
	}

	const actions = [,
	  { icon: <VideocamIcon />, name: 'New session replay', onClick: onRecordingClick },
	  { icon: <CameraAltIcon />, name: 'New screenshot', onClick: onScreenshotClick },
		{ icon: <ForumIcon />, name: 'View conversation', onClick: onConversationClick },
	  { icon: <ShareIcon />, name: 'Share link' },
	  { icon: <ThumbUpIcon />, name: 'Looks good to me!' },
	];

  return (
    <>
      <BasicSpeedDial actions={actions}/>

			{ isConversationModalVisible ? 
				<ConversationModal 
					setIsConversationModalVisible={setIsConversationModalVisible}
				/> : null }

			{ isScreenshotModalVisible ? 
				<ScreenshotModal
					setIsScreenshotModalVisible={setIsScreenshotModalVisible}
				/> : null }
				
			{ isRecordingModalVisible ? 
				<RecordingModal 
					setIsRecordingModalVisible={setIsRecordingModalVisible}
				/> : null }
    </>
  )
}

export default App
