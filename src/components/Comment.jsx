import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import formatToRelativeDate from "../utils/formatToRelativeDate";

function CommentHeader({ user, createdAt }) {
  return (
    <Stack
      className="comment-header"
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Avatar alt={user.login} src={user.avatar_url} />
      <h2>
        {user.login} commented {formatToRelativeDate(createdAt)}
      </h2>
    </Stack>
  );
}

function CommentReactions() {}
function CommentBody() {}
function Comment({ comment }) {
  return (
    <>
      <CommentHeader user={comment.user} createdAt={comment.created_at} />
      <Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>
      <hr />
    </>
  );
}

export default Comment;
