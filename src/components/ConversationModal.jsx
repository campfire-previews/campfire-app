import Conversation from "./Conversation";
import Container from "@mui/material/Container";

function ConversationModal({ onHideModal, comments, onCreateComment }) {
  return (
    <>
      <Container maxWidth="sm">
        <Conversation
          comments={comments}
          onCreateComment={onCreateComment}
          onHideModal={onHideModal}
        />
      </Container>
      <div className="modalOverlay"></div>
    </>
  );
}

export default ConversationModal;
