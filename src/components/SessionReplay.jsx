import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router";

import * as rrweb from "rrweb";
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';


// 8bfd3309-4af1-4abf-8067-8468394a2d42
function SessionReplay({  }) {
	const { repo, issue_number, id } = useParams();
	const playerRef = useRef(null);

	useEffect(() => {
		(async () => {
			const response = await fetch(`https://r5mggbu5q0.execute-api.us-east-2.amazonaws.com/demo/repos/${repo}/issue_number/${issue_number}/session-replay/${id}`)
			const { data: events } = await response.json();
			const replayer = new rrwebPlayer({
				target: playerRef.current,
				props: { events }
			});
			replayer.play();
		})()
	}, []);


	return (
		<>
			<main ref={playerRef}>
			</main>
		</>
	)
}

export default SessionReplay;