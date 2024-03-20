function RecordingModal({ onHideModal }) {
	const onModalOverlayClick = (e) => {
		onHideModal();
	}

	return (
		<>
			<div className="modalContainer">
				<p>Session Replay Modal</p>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

export default RecordingModal