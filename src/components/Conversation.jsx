import { useState } from "react";
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
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="newComment">New Comment:</label>
        <input
          id="newComment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form> */}
    </div>
  );
}

export default Conversation;
