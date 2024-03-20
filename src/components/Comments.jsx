import Comment from "./Comment.jsx";

function Comments({ comments }) {
	return (
		<>
			{comments.map(({ body, user, id }) => (
        <Comment user={user.login} comment={body} key={id} />
	    ))}
		</>
	)
}

export default Comments