import React, { useEffect, useState } from "react";
import ben from "../ben/ben";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

const SUBDOMAIN = import.meta.env.VITE_SUBDOMAIN;
const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;

function FeedbackInterface({ repo, issue_number, comments, setComments }) {
  const [newComment, setNewComment] = useState("");

  const onCreateComment = async (e) => {
    e.preventDefault();
    await ben.postComment(repo, issue_number, newComment);
    setNewComment("");
    ben.getComments(repo, issue_number).then(setComments);
  };

  return (
    <div id="comments-container">
      <h1>Comments</h1>
      {comments.map(({ body, user }, idx) => (
        <Comment user={user.login} comment={body} key={idx} />
      ))}
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
  );
}

function Preview({ repo, issue_number }) {
  const previewAppLink = `https://${repo}-${issue_number}.${SUBDOMAIN}.${USER_DOMAIN}`;
  return <iframe src={previewAppLink} title="Preview"></iframe>;
}

function PreviewEnvironment() {
  const { repo, issue_number } = useParams();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    (async () => {
      let comments = await ben.getComments(repo, issue_number);
      setComments(comments);
      setShowComments(true);
      console.log(comments);
    })();
  }, [repo, issue_number]);

  return (
    <>
      <Preview repo={repo} issue_number={issue_number} />
      <FeedbackInterface
        repo={repo}
        issue_number={issue_number}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}
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

function Dashboard() {
  return <p>This is your dashboard page.</p>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/:repo/:issue_number" element={<PreviewEnvironment />} />
      </Routes>
    </Router>
  );
}

export default App;
