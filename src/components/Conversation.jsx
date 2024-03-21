import Editor from "../editor/Editor";
import Comments from "./Comments";

function Conversation({ comments, onCreateComment }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div id="conversation-container">
      <Comments comments={comments} />
      <div id="editor-wrapper">
        <Editor onCreateComment={onCreateComment} />
      </div>
    </div>
  );
}

export default Conversation;
