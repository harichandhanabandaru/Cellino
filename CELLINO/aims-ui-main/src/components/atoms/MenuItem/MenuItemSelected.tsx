import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface menuItemProps {
  Item: String;
  index: number;
  handleChange: any;
}

function MenuItemSelected(props: menuItemProps) {
  return (
    <MenuItem
      value={props.index}
      disableRipple
      onClick={props.handleChange}
      sx={{
        height: "34px",
      }}
      data-testId={"MenuItemSelected"}
    >
      <Typography variant="body4">{props.Item}</Typography>
    </MenuItem>
  );
}

export default MenuItemSelected;
