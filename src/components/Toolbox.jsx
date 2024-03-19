import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

function Toolbox({ tools }) {
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