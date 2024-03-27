function formatComment(commentData) {
  return `### 🧑‍💻 ${commentData.user} from campfire says:

${commentData.LGTM ? LGTMMessage() : commentData.comment}

${makeMarkdownTableOfUserData(commentData.userData)}`;
}

function makeMarkdownTableOfUserData(userData) {
  return `| Details             |   |
|---------------------|---|
| Operating System    | ${userData.os.name}   |
| Browser             | ${userData.browser.name} ${userData.browser.version}  |
| Screen Size (W x H) | ${userData.screenSize.width} x ${userData.screenSize.height}  |`;
}

function LGTMMessage() {
  return `Looks good to me! 
![LGTM-GIF](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzdnajU1aWZrZnVobXZrOHI1OWE5OWlvdXdmZHRodGJld2QzbnpraiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tIeCLkB8geYtW/giphy.gif)`;
}

export default formatComment;
