import { useState, useRef, useEffect, useLayoutEffect } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import api from "../apiClient";


function RecordingModal({ onHideModal, events, onSendRecording }) {
  const [ isRecording, setIsRecording ] = useState(false);
	const playerRef = useRef(null);
	const [ replayer, setReplayer ] = useState();
  

  const onModalOverlayClick = (e) => {
    onHideModal();
  };

  useEffect(() => {
		const replayer = new rrwebPlayer({
	    target: playerRef.current,
	    props: { 
				events
			},
  	})
    replayer.play();

		let rr_player = Array.from(document.getElementsByClassName('rr-player'));
    let player__frame = Array.from(document.getElementsByClassName('rr-player__frame'));
    player__frame[0].style.width = "75vw";
		player__frame[0].style.height = "50vh";
		rr_player[0].style.width = "75vw"
		rr_player[0].style.height = "50vh"
  }, []);

  return (
    <>
      <div className="modalContainer" id="recording-modal">
        <div id="player" ref={playerRef}></div>
        <button id="send-recording" onClick={() => onSendRecording()}>
          Send in comment
        </button>
      </div>
      <div className="modalOverlay" onClick={onModalOverlayClick}></div>
    </>
  );
}

export default RecordingModal;
