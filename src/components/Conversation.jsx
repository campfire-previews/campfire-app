import Editor from "../editor/Editor";

import Comments from "./Comments";

function Conversation({ comments, onCreateComment }) {
	return (
		<div id="conversation-container">
      <h1>campfire conversation</h1>
      <Comments comments={comments}/>
      <div className="editorWrapper">
        <Editor onCreateComment={onCreateComment}/>
      </div>
    </div>
	)
}

export default Conversation