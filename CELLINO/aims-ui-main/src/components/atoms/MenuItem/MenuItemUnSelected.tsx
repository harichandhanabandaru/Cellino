import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface menuItemProps {
  Item: String;
  index: number;
  handleChange: any;
}

function MenuItemUnSelected(props: menuItemProps) {
  return (
    <MenuItem
      value={props.index}
      disableRipple
      onClick={props.handleChange}
      sx={{
        height: "34px",
      }}
      data-testId={"MenuItemUnselected"}
    >
      <Typography variant="body4" sx={{ color: "#979598" }}>
        {props.Item}
      </Typography>
    </MenuItem>
  );
}

export default MenuItemUnSelected;
