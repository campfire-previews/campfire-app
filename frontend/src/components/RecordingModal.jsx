import { useState, useRef, useEffect } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import api from "../apiClient";

function RecordingModal({ onHideModal, events, onSendRecording }) {
  const [isRecording, setIsRecording] = useState(false);
  const playerRef = useRef(null);

  const onModalOverlayClick = (e) => {
    onHideModal();
  };

  useEffect(() => {
    const replayer = new rrwebPlayer({
      target: playerRef.current,
      props: { events },
    });
    replayer.play();
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
