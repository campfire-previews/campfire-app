function Comment({ user, comment }) {
  return (
    <>
      <p>
        {comment} - {user}
      </p>
      <hr />
    </>
  );
}

export default Comment