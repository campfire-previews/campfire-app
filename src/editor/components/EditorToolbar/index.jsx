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
      sx={{ background: "#fff", py: 1.5, px: 3.75 }}
    >
      {toolbarIconsList.map((plugin) => (
        <Grid key={plugin.id} sx={{cursor: "pointer",}} item >
          {
            <plugin.Icon
              sx={plugin.iconSx}
              onClick={() => onClick(plugin.event)}
              color={isIconSelected(plugin) ? "#e2554f" : undefined}
            />
          }
        </Grid>
      ))}
      {modal}
    </Grid>
  );
};

export default EditorToolbar;