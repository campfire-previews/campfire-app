import { useEffect, useState } from "react";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumIcon from "@mui/icons-material/Forum";
import VideocamIcon from "@mui/icons-material/Videocam";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LGTM from "../utils/LGTMMessage";
import ConfettiExplosion from "react-confetti-explosion";

function Toolbox({ dispatchModals, onCreateComment, repo, issue_number, handleStartRecording }) {
  const [isExploding, setIsExploding] = useState(false);
  const [isLGTMsent, setIsLGTMsent] = useState(false);
	const [tools, setTools] = useState([
    {
      icon: <VideocamIcon />,
      name: "New session replay",
      onClick() { handleStartRecording() }
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
        if (!isLGTMsent) {
          onCreateComment(LGTM());
          localStorage.setItem(`LGTM-${repo}-${issue_number}`, true);
          setIsLGTMsent(true);
          updateLGTMtoConfetti();
        }
        setIsExploding((isExploding) => !isExploding);
      },
    },
  ]);

  useEffect(() => {
    setIsLGTMsent(!!localStorage.getItem(`LGTM-${repo}-${issue_number}`));
    if (!!localStorage.getItem(`LGTM-${repo}-${issue_number}`)) {
      updateLGTMtoConfetti();
    }
  }, []);

  const largeProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ["#363F54", "#E2554F", "#ED6B2C", "#ED9837", "#EFBE43"],
  };

  // Temporarily changes tool's title to new title, reverts back to original
  const updateToolTitle = (originalTitle, newTitle) => {
    setTools((prevState) => {
			const updatedTools = prevState.map((tool) => {
				return tool.name === originalTitle ? { ...tool, name: newTitle } : tool;
			});

			setTimeout(() => {
				setTools((prevState) => prevState.map((tool) => {
					return tool.name === newTitle ? { ...tool, name: originalTitle } : tool
				}));
			}, 2000);

			return updatedTools;
		});
  };

  // Changes tool icon
  const updateLGTMtoConfetti = () => {
    setTools((prevState) => {
			const updatedTool = {
	      icon: <CelebrationIcon />,
	      name: "Confetti!",
	    };

			const updatedTools = prevState.map((tool) => {
				return tool.name === "Looks good to me!" ? { ...tool, ...updatedTool } : tool
			});

			return updatedTools;
		});
  };

  return (
    <>
      {isExploding && <ConfettiExplosion {...largeProps} />}
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
    </>
  );
}

export default Toolbox;
