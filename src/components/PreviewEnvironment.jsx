import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import ben from "../../ben/ben.js";
import Preview from "./Preview";
import FeedbackInterface from "./FeedbackInterface";

function PreviewEnvironment() {
  const { repo, issue_number } = useParams();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    (async () => {
      let comments = await ben.getComments(repo, issue_number);
      setComments(comments);
      setShowComments(true);
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

export default PreviewEnvironment;