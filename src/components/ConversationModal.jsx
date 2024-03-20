import Conversation from "./Conversation";

function ConversationModal({ onHideModal, comments, onCreateComment }) {
	return (
		<>
			<div className="modalContainer">
				<Conversation comments={comments} onCreateComment={onCreateComment}/>
			</div>
			<div className="modalOverlay" onClick={() => onHideModal()}></div>
		</>
	)
}

export default ConversationModal;