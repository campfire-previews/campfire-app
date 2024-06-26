import Comment from "./Comment";
import Stack from "@mui/material/Stack";

function Comments({ comments }) {
  return (
    <Stack id="Comments" gap={2}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
}

export default Comments;
