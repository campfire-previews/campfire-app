import { useRef } from "react";
import { useParams } from "react-router";
import Preview from "./Preview.jsx";
import FeedbackInterface from "./FeedbackInterface.jsx";

function PreviewEnvironment() {
  const { repo, issue_number } = useParams();
  const iFrameRef = useRef(null);

  return (
    <>
      <Preview repo={repo} issue_number={issue_number} iFrameRef={iFrameRef} />
      <FeedbackInterface
        repo={repo}
        issue_number={issue_number}
        iFrameRef={iFrameRef}
      />
    </>
  );
}

export default PreviewEnvironment;
