import Comment from "./Comment.jsx";

function Conversation({ comments }) {
	return (
		<div id="conversation-container">
      <h1>campfire conversation</h1>
      <Comments comments={comments}/>
      <form onSubmit={onCreateComment}>
        <label htmlFor="newComment">New Comment:</label>
        <input
          id="newComment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
	)
}

export default Conversation