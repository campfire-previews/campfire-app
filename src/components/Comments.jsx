import Comment from "./Comment";
import Stack from "@mui/material/Stack";

function Comments({ comments }) {
  return (
    <Stack id="comments-container">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
  // return (
  // 	<div className="commentList">
  // 		{comments.map(({ id, user, body }) => (
  //       <Comment key={id} user={user.login} comment={body} />
  //     ))}
  // 	</div>
  // )
}

export default Comments;
