import { Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";

const APP_ID = import.meta.env.VITE_APP_ID;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const OWNER = import.meta.env.VITE_OWNER;
const privateKey = import.meta.env.VITE_PRIVATE_KEY_8;

// everything attached to ben gets exported,
// if it's meant to be used BY ben but NOT by the frontend,
// DONT ATTACH IT TO BEN (don't expose what doesn't need to be)
let ben = {};

async function getInstallationId(repo) {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: APP_ID,
      privateKey,
    },
  });

  let response = await octokit.request(
    "GET /repos/{owner}/{repo}/installation",
    {
      owner: OWNER,
      repo,
    }
  );
  return response.data.id;
}

ben.getComments = async function (repo, issue_number) {
  let installationId = await getInstallationId(repo);
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: APP_ID,
      privateKey,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      installationId,
    },
  });

  const response = await octokit.rest.issues.listComments({
    owner: OWNER,
    repo,
    issue_number,
  });
  return response.data;
};

ben.postComment = async function (repo, issue_number, body) {
  let installationId = await getInstallationId(repo);
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: APP_ID,
      privateKey,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      installationId,
    },
  });

  const response = await octokit.rest.issues.createComment({
    owner: OWNER,
    repo,
    issue_number,
    body,
  });

  return response.data;
};

// let repo = "client-app";
// console.log(
//   "POST",
//   await ben.postComment(repo, "74", "Testing comment from ben!!!")
// );
// console.log("GET", await ben.getComments(repo, "74"));

export default ben;
