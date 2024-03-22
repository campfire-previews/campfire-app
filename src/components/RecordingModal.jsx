import { useState, useRef, useEffect } from 'react'

import * as rrweb from "rrweb";
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

function RecordingModal({ onHideModal, iFrameRef }) {
	const [ events, setEvents ] = useState([]);
	const [ stopFn, setStopFn ] = useState(null);
	const [ isRecording, setIsRecording ] = useState(false);
	const playerRef = useRef(null);

	const onModalOverlayClick = (e) => {
	onHideModal();
	}

	const handleStartRecording = (e) => {
		e.preventDefault();
		
		setIsRecording(true)
		setStopFn(prevState => (new rrweb.record({
			emit(event) {
				setEvents(prevState => prevState.concat(event));
			},
			recordCrossOriginIframes: true,
		})));

		// the second argument for postMessage is the 'targetOrigin'
		// eventually, the targetOrigin should be "https://CLIENT-APP-PR.preview.CLIENT_DOMAIN"
		const URL_PATHNAME = window.location.pathname;
		iFrameRef.current.contentWindow.postMessage(URL_PATHNAME, 'http://localhost:5174');
	}

	const handleStopRecording = (e) => {
		e.preventDefault();

		stopFn();
		setIsRecording(false);
		const replayer = new rrwebPlayer({
			target: playerRef.current,
			props: { events }
		});
		replayer.play();
	}

	return (
		<>
			<div className="modalContainer">
				<p>Session Replay Modal</p>
				<button id="start-recording" onClick={handleStartRecording} disabled={isRecording}>Start</button>
				<button id="stop-recording" onClick={handleStopRecording} disabled={!isRecording}>Stop</button>
				
				<div id="player" ref={playerRef}></div>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

export default RecordingModal