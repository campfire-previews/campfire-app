import { useState, useRef, useEffect } from 'react'

import * as rrweb from "rrweb";
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

function RecordingModal({ onHideModal, events }) {
	const [ isRecording, setIsRecording ] = useState(false);
	const playerRef = useRef(null);

	const onModalOverlayClick = (e) => {
		onHideModal();
	}

	useEffect(() => {
		const replayer = new rrwebPlayer({
			target: playerRef.current,
			props: { events }
		});
		replayer.play();
	}, [])

	return (
		<>
			<div className="modalContainer">
				<p>Session Replay Modal</p>
				<div id="player" ref={playerRef}></div>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

export default RecordingModal