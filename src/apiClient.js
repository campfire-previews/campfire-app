import axios from "axios";
const api = {};
const baseURL = "/api";

api.getComments = async function (repo, issue_number) {
  const response = await axios.get(
    baseURL + `/comments/repo/${repo}/issue_number/${issue_number}`
  );

  return response.data;
};

api.sendComment = async function (repo, issue_number, commentData) {
  const response = await axios.post(
    baseURL + `/comments/repo/${repo}/issue_number/${issue_number}`,
    commentData,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

// expecting
api.saveSessionReplay = async function (repo, issue_number, events) {
  const response = await axios.post(
    baseURL + `/session-replay/repo/${repo}/issue_number/${issue_number}`,
    events,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

// expects event obj saved at the id
api.getSessionReplay = async function (repo, issue_number, id) {
  const response = await axios.get(
    baseURL + `/session-replay/repo/${repo}/issue_number/${issue_number}/${id}`
  );
  return response.data;
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
