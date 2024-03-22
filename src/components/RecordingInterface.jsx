import { useState, useEffect } from "react";
import Dot from "./Dot";

function RecordingInterface({ handleStopRecording }) {
	const [ isDotVisible, setIsDotVisible ] = useState(true);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setIsDotVisible(prevState => !prevState);
		}, 800)

		return (() => clearTimeout(timerId))
	}, [isDotVisible]);

  return (
    <div id="recordingInterface">
			<div>
				<p>Recording...</p>
				<Dot isDotVisible={isDotVisible}/>
			</div>
			<button onClick={handleStopRecording}>Stop Recording</button>
      
    </div>
  );
}

export default RecordingInterface