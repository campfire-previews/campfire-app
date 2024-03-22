import { useState } from "react";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumIcon from "@mui/icons-material/Forum";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideocamIcon from "@mui/icons-material/Videocam";

import LGTM from "../utils/LGTMMessage";
function Toolbox({ dispatchModals, onCreateComment }) {
  const [tools, setTools] = useState([
    {
      icon: <VideocamIcon />,
      name: "New session replay",
      onClick() {
        dispatchModals({ type: "display-recording-modal" });
      },
    },
    {
      icon: <CameraAltIcon />,
      name: "New screenshot",
      onClick() {
        dispatchModals({ type: "display-screenshot-modal" });
      },
    },
    {
      icon: <ForumIcon />,
      name: "View conversation",
      onClick() {
        dispatchModals({ type: "display-conversation-modal" });
      },
    },
    {
      icon: <ShareIcon />,
      name: "Share link",
      onClick() {
        navigator.clipboard.writeText(window.location.href);
        updateToolTitle("Share link", "Copied link!");
      },
    },
    {
      icon: <ThumbUpIcon />,
      name: "Looks good to me!",
      onClick() {
        onCreateComment(LGTM());
      },
    },
  ]);

  // Temporaily changes tool's title to new title, reverts back to original
  const updateToolTitle = (originalTitle, newTitle) => {
    const originalTools = tools.slice();
    const originalTool = originalTools.find(
      (tool) => tool.name === originalTitle
    );
    const updatedTool = { ...originalTool, name: newTitle };
    const updatedTools = originalTools.map((tool) =>
      tool.name === originalTitle ? updatedTool : tool
    );

    setTools((prevState) => updatedTools);
    setTimeout(() => setTools((prevState) => originalTools), 2000);
  };

  return (
    <SpeedDial
      className="speedDial"
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 20, left: 20, zIndex: 1 }}
      icon={<SpeedDialIcon />}
      FabProps={{
        style: {
          backgroundColor: "#E2554F",
          "&:hover": {
            backgroundColor: "#E2554F",
          },
        },
      }}
    >
      {tools.map((tool) => (
        <SpeedDialAction
          key={tool.name}
          icon={tool.icon}
          tooltipTitle={tool.name}
          onClick={tool.onClick}
        />
      ))}
    </SpeedDial>
  );
}

export default Toolbox;
