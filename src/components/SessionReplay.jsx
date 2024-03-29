import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router";

import * as rrweb from "rrweb";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

function SessionReplay({  }) {
	const { repo, issue_number, id } = useParams();
	const playerRef = useRef(null);

	useEffect(() => {
		(async () => {
			const response = await fetch(`https://r5mggbu5q0.execute-api.us-east-2.amazonaws.com/demo/repos/${repo}/issue_number/${issue_number}/session-replay/${id}`)
			const { data: events } = await response.json();
			if (events.length > 0) {
				const replayer = new rrwebPlayer({
					target: playerRef.current,
					props: { events }
				});
				replayer.play();
			}

			let rr_player = Array.from(document.getElementsByClassName('rr-player'));
    	let player__frame = Array.from(document.getElementsByClassName('rr-player__frame'));
    	player__frame[0].style.width = "75vw";
			player__frame[0].style.height = "50vh";
			rr_player[0].style.width = "75vw"
			rr_player[0].style.height = "50vh"
		})()
	}, []);


	return (
		<>
			<div id="playerContainer">
				<div id="playerMain" ref={playerRef}></div>
				<a href={`${location.origin}/${repo}/${issue_number}`}>
					<button>Visit preview environment</button>
				</a>	
			</div>
		</>
	)
}

export default SessionReplay;
