import UAParser from "ua-parser-js";

function getUserData() {
  let parser = new UAParser();
  let userData = {};
  userData.browser = parser.getBrowser();
  userData.os = parser.getOS();
  userData.screenSize = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  return userData;
}

function makeMarkdownTableOfUserData(userData) {
  return `| Details             |   |
|---------------------|---|
| Operating System    | ${userData.os.name}   |
| Browser             | ${userData.browser.name} ${userData.browser.version}  |
| Screen Size (W x H) | ${userData.screenSize.width} x ${userData.screenSize.height}  |`;
}

export default getUserData;
