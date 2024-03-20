import Comment from "./Comment";

function Comments({ comments }) {
	return (
		<div className="commentList">
			{comments.map(({ id, user, body }) => (
        <Comment key={id} user={user.login} comment={body} />
      ))}
		</div>
	)
}

export default Comments