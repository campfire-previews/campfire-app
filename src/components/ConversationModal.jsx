function ConversationModal({ onHideModal }) {
	const onModalOverlayClick = (e) => {
		onHideModal();
	}

	return (
		<>
			<div className="modalContainer">
				<p>Conversation Modal</p>
			</div>
			<div className="modalOverlay" onClick={onModalOverlayClick}></div>
		</>
	)
}

export default ConversationModal;