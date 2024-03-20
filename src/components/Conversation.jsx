import { useState } from "react";
import Editor from "../editor/Editor";
import Comments from "./Comments";

function Conversation({ comments, onCreateComment }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreateComment(newComment);
    setNewComment("");
  };

	return (
		<div id="conversation-container">
      <h1>campfire conversation</h1>
      <Comments comments={comments}/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newComment">New Comment:</label>
        <div className="editorWrapper">
          <Editor />
        </div>
        {/* <input
          id="newComment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        /> */}
        <button type="submit">Post Comment</button>
      </form>
    </div>
	)
}

export default Conversation