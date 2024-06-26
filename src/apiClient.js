import axios from "axios";
const api = {};
const baseURL = import.meta.env.VITE_BASE_URL;

api.getComments = async function (repo, issue_number) {
  const response = await axios.get(
    baseURL + `/repos/${repo}/issue_number/${issue_number}/comments`
  );

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
    baseURL + `/repos/${repo}/issue_number/${issue_number}/session_replay`,
    { body: events },
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(response);
  return response.data.id;
};

// expects event obj saved at the id
api.getSessionReplay = async function (repo, issue_number, id) {
  const response = await axios.get(
    baseURL + `/repos/${repo}/issue_number/${issue_number}/session_replay/${id}`
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
