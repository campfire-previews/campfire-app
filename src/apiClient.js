import axios from "axios";
const api = {};
const baseURL = "https://r5mggbu5q0.execute-api.us-east-2.amazonaws.com/demo";

api.getComments = async function (repo, issue_number) {
  const response = await axios.get(
    baseURL + `/repos/${repo}/issue_number/${issue_number}/comments`
    baseURL + `/repos/${repo}/issue_number/${issue_number}/comments`
  );

  return response.data.comments;
  return response.data.comments;
};

api.sendComment = async function (repo, issue_number, commentData) {
  const response = await axios.post(
    baseURL + `/repos/${repo}/issue_number/${issue_number}/comments`,
    JSON.stringify(commentData),
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.data;
};

// expecting
api.saveSessionReplay = async function (repo, issue_number, events) {
  const response = await axios.post(
    baseURL + `/repos/${repo}/issue_number/${issue_number}/session-replay`,
    { body: events },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.id;
};

// expects event obj saved at the id
api.getSessionReplay = async function (repo, issue_number, id) {
  const response = await axios.get(
    baseURL + `/repos/${repo}/issue_number/${issue_number}/session-replay/${id}`
  );
  return response.data.data;
};

export default api;
// Code for testing:
// const commentData = {
//   user: "tess",
//   comment: "hello from api",
//   LGTM: false,
//   userData: {
//     os: { name: "MacOS" },
//     browser: { name: "Brave" },
//     screenSize: { width: 2012, height: "788" },
//   },
// };
// api.sendComment("client-app", "100", commentData).then((r) => console.log(r));
