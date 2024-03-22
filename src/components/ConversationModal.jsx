import Conversation from "./Conversation";
import Container from "@mui/material/Container";

function ConversationModal({ onHideModal, comments, onCreateComment }) {
  return (
    <>
      <Container maxWidth="sm">
        <Conversation comments={comments} onCreateComment={onCreateComment} />
      </Container>
      <div className="modalOverlay" onClick={() => onHideModal()}></div>
    </>
  );
}

export default ConversationModal;
