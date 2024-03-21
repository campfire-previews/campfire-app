import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import formatToRelativeDate from "../utils/formatToRelativeDate";
import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";

function CommentHeader({ user, createdAt }) {
  return (
    <Stack
      className="comment-header"
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Avatar alt={user.login} src={user.avatar_url} />
      <p>
        <b>{user.login}</b> commented {formatToRelativeDate(createdAt)}
      </p>
    </Stack>
  );
}

function CommentReactions({ reactions }) {
  function handleClick() {
    console.log("reaction clicked!");
  }
  return (
    <Stack className="comment-reactions" direction="row" spacing={2}>
      <Chip label={"😎"} onClick={handleClick} />
      <Chip label={"👍"} onClick={handleClick} />
    </Stack>
  );
}
function CommentBody({ body }) {
  return (
    <div className="comment-body">
      <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
    </div>
  );
}
function Comment({ comment }) {
  return (
    <div className="comment">
      <CommentHeader user={comment.user} createdAt={comment.created_at} />
      <CommentBody body={comment.body} />
      <CommentReactions reactions={comment.reactions} />
    </div>
  );
}

export default Comment;
