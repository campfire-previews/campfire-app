import Editor from "../editor/components/Editor";
import Comments from "./Comments";

function Conversation({ comments, onCreateComment, onHideModal }) {
  return (
    <div id="conversation-container">
      <i className="fa fa-times closeIcon" onClick={onHideModal}></i>
      <Comments comments={comments} />
      <Editor onCreateComment={onCreateComment} />
    </div>
  );
}

export default Conversation;
