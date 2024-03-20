import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

function Toolbox({ tools }) {
	const tools = [
	  { 
			icon: <VideocamIcon />,
      name: 'New session replay',
      onClick() { dispatchModals({ type: "display-recording-modal" }) } 
    },
	  {
      icon: <CameraAltIcon />,
      name: 'New screenshot',
      onClick() { dispatchModals({ type: "display-screenshot-modal" }) } 
    },
		{
      icon: <ForumIcon />,
      name: 'View conversation',
      onClick() { dispatchModals({ type: "display-conversation-modal" }) } 
    },
	  {
      icon: <ShareIcon />,
      name: 'Share link'
    },
	  {
      icon: <ThumbUpIcon />,
      name: 'Looks good to me!'
    },
	];

	return (
		<SpeedDial
			className="speedDial"
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1}}
      icon={<SpeedDialIcon/>}
			FabProps={{
				style: {
					backgroundColor: "#BA1B1D",
					'&:hover': {
        		backgroundColor: '#BA1B1D',
      		}
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
	)
}

export default Toolbox;