import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import api from "../apiClient.js";
import Preview from "./Preview";
import removeBotPrefix from "../utils/removeBotComments.js";
import FeedbackInterface from "./FeedbackInterface";
import getUserData from "../utils/getUserData.js";

function PreviewEnvironment() {
  const { repo, issue_number } = useParams();
  const [comments, setComments] = useState([]);
  const iFrameRef = useRef(null);

  useEffect(() => {
    getUserData();
    (async () => {
      let comments = await api.getComments(repo, issue_number);
      const filteredComments = removeBotPrefix(comments);
      setComments(filteredComments);
    })();
  }, [repo, issue_number]);

  const handleCreateComment = async (newComment, LGTM = false) => {
    const commentData = {
      user: localStorage.getItem("userName"),
      comment: newComment,
      LGTM,
      userData: getUserData(),
    };

    const data = await api.sendComment(repo, issue_number, commentData);
    setComments((prevState) => prevState.concat(data));
  };

  return (
    <>
      <Preview repo={repo} issue_number={issue_number} iFrameRef={iFrameRef} />
      <FeedbackInterface
        repo={repo}
        issue_number={issue_number}
        comments={comments}
        onCreateComment={handleCreateComment}
        iFrameRef={iFrameRef}
      />
    </>
  );
}

export default PreviewEnvironment;
