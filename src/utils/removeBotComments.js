function removeBotComments(comments) {
  const commentPrefix = `<!-- status-comment: do not delete/edit this line -->`;
  return comments.filter(({ body }) => !body.includes(commentPrefix));
}

export default removeBotComments;