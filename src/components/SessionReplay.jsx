import { useEffect, useRef } from "react";

import { useParams } from "react-router";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import api from "../apiClient";

function SessionReplay({}) {
  const { repo, issue_number, id } = useParams();
  const playerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const events = await api.getSessionReplay(repo, issue_number, id);
      if (events.length > 0) {
        const replayer = new rrwebPlayer({
          target: playerRef.current,
          props: { events },
        });
        replayer.play();
      }
      console.log(events);
    })();
  }, []);

  // <div id="RecordingModalWrapper">
  //     <div id="RecordingModal">
  //       <div id="player" ref={playerRef}></div>
  //       <button id="send-recording" onClick={() => onSendRecording()}>
  //         send in comment
  //       </button>
  //     </div>
  //     <div className="modalOverlay" onClick={onModalOverlayClick}></div>
  //   </div>

  return (
    <div id="SessionReplay">
      <div id="playerMain" ref={playerRef}></div>
      <a href={`${location.origin}/${repo}/${issue_number}`}>
        <button>Visit preview environment</button>
      </a>
    </div>
  );
}

export default SessionReplay;
