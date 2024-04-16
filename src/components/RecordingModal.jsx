import { useRef, useEffect } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

function RecordingModal({ onHideModal, events, onSendRecording }) {
  const playerRef = useRef(null);

  const onModalOverlayClick = (e) => {
    onHideModal();
  };

  useEffect(() => {
    const replayer = new rrwebPlayer({
      target: playerRef.current,
      props: {
        events,
      },
    });
    replayer.play();
  }, []);

  return (
    <div id="RecordingModalWrapper">
      <div id="RecordingModal">
        <div id="player" ref={playerRef}></div>
        <button id="send-recording" onClick={() => onSendRecording()}>
          send in comment
        </button>
      </div>
      <div className="modalOverlay" onClick={onModalOverlayClick}></div>
    </div>
  );
}

export default RecordingModal;
