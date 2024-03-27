import { Grid } from "@mui/material";
import toolbarIconsList from "./toolbarIconsList";
import useOnClickListener from "./useOnClickListener";

const EditorToolbar = () => {
  const { onClick, selectedEventTypes, blockType, modal } =
    useOnClickListener();

  const isIconSelected = (plugin) =>
    selectedEventTypes.includes(plugin.event) ||
    blockType.includes(plugin.event);

  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={0.01}
      alignItems="center"
      sx={{ background: "#f5e5ca", py: 1.5, px: 1.5 }}
    >
      {toolbarIconsList.map((plugin) => (
        <Grid key={plugin.id} sx={{cursor: "pointer",}} item >
          {
            <plugin.Icon
              sx={plugin.iconSx}
              onClick={() => onClick(plugin.event)}
              color={isIconSelected(plugin) ? "#efbe43" : undefined}
            />
          }
        </Grid>
      ))}
      {modal}
    </Grid>
  );
};

export default EditorToolbar;