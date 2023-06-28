import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import MenuItemSelected from "../../atoms/MenuItem/MenuItemSelected";
import MenuItemUnSelected from "../../atoms/MenuItem/MenuItemUnSelected";

interface menuProps {
  options: String[];
  handleChange: any;
  value: number;
}

function Menu(props: menuProps) {
  const value = props.value;
  return (
    <div>
      <Popper transition open>
        <Paper
          sx={{ borderRadius: "8px", width: "205px", height: "70px" }}
          data-testid="RightClickPopper"
        >
          {props.options.map((option, index) =>
            value === index ? (
              <MenuItemSelected
                Item={option}
                index={index}
                handleChange={props.handleChange}
              />
            ) : (
              <MenuItemUnSelected
                Item={option}
                index={index}
                handleChange={props.handleChange}
              />
            )
          )}
        </Paper>
      </Popper>
    </div>
  );
}

export default Menu;
