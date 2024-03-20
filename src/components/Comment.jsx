import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Comment({ user, comment }) {
  return (
    <>
      <h2>{user}</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{comment}</Markdown>
      <hr />
    </>
  );
}

export default Comment