import ben from "./ben/ben.js";
import express from "express";
import formatComment from "./utils/formatComment.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;
app.use(express.json({ limit: "5mb" }));

const SESSIONS = {};

// Get all comments
// return comments
app.get(
  "/api/comments/repo/:repo/issue_number/:issue_number",
  async (req, res) => {
    let comments = await ben.getComments(
      req.params.repo,
      req.params.issue_number
    );
    res.send(comments);
  }
);

// POST A COMMENT
// IF LGTM IS TRUE, WILL IGNORE COMMENT
// expects a json object:
// {
//   "user": "tess",
//   "comment": "hello from api",
//   "LGTM": false,
//   "userData": {
//       "os": {"name": "MacOS"},
//       "browser": {"name": "Brave"},
//       "screenSize": {"width": 2012, "height": "788"}
//   }
// }
app.post(
  "/api/comments/repo/:repo/issue_number/:issue_number",
  async (req, res) => {
    let comment = formatComment(req.body);
    let response = await ben.postComment(
      req.params.repo,
      req.params.issue_number,
      comment
    );
    res.send(response);
  }
);

app.get(
  "/api/session-replay/repo/:repo/issue_number/:issue_number/:id",
  (req, res) => {
    console.log(SESSIONS);
    if (SESSIONS[req.params.id]) {
      res.send(SESSIONS[req.params.id]);
    } else {
      res.status(404).send("Session not found");
    }
  }
);
// upload a user's photo to s3
// return a link to the resource

// Upload a session replay to s3
// return the id
app.post(
  "/api/session-replay/repo/:repo/issue_number/:issue_number",
  (req, res) => {
    const events = req.body;
    const id = uuidv4();
    SESSIONS[id] = events;
    res.send(id);
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
