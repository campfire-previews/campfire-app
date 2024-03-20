import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import ben from "../../ben/ben.js";
import Preview from "./Preview";
import FeedbackInterface from "./FeedbackInterface";

function PreviewEnvironment() {
  const { repo, issue_number } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      let comments = await ben.getComments(repo, issue_number);
      setComments(comments);
    })();
  }, [repo, issue_number]);

  const handleCreateComment = async (newComment) => {
    const data = await ben.postComment(repo, issue_number, newComment);
    setComments(prevState => prevState.concat(data));
  };

  return (
    <>
      <Preview repo={repo} issue_number={issue_number} />
      <FeedbackInterface
        repo={repo}
        issue_number={issue_number}
        comments={comments}
        onCreateComment={handleCreateComment}
        
      />
    </>
  );
}

export default PreviewEnvironment;