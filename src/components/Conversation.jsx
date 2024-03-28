import Editor from "../editor/components/Editor";
import Comments from "./Comments";

function Conversation({ comments, onCreateComment }) {
  return (
    <div id="conversation-container">
      <Comments comments={comments} />
      <Editor onCreateComment={onCreateComment} />
    </div>
  );
}

export default Conversation;
