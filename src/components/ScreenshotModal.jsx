function ScreenshotModal({ onHideModal }) {
	const onModalOverlayClick = (e) => {
		onHideModal();
	}

	return (
		<>
			<div className="modalContainer">
				<p>Screenshot Modal</p>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

export default ScreenshotModal;