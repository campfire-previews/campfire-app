import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ben from "../../ben/ben.js";
import Preview from "./Preview";
import removeBotPrefix from "../utils/removeBotComments.js"
import FeedbackInterface from "./FeedbackInterface";
import getUserData from "../utils/getUserData.js";

function PreviewEnvironment() {
  const { repo, issue_number } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserData();
    (async () => {
      let comments = await ben.getComments(repo, issue_number);
      const filteredComments = removeBotPrefix(comments);
      setComments(filteredComments);
    })();
  }, [repo, issue_number]);

  const handleCreateComment = async (newComment) => {
    const userName = localStorage.getItem("userName");
    const message = `### 🧑‍💻 ${userName} from campfire says: \n ${newComment} \n ${getUserData()}`;
    const data = await ben.postComment(repo, issue_number, message);
    setComments((prevState) => prevState.concat(data));
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
