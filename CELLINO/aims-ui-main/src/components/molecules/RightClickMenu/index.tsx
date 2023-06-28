import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { MenuItem, Typography } from "@mui/material";
import { COLORS } from "../../../theme/Colors";

export interface menuProps {
  show: boolean;
  xCoordinate: number;
  yCoordinate: number;
  handleClickAway: (event: MouseEvent | TouchEvent) => void;
  handleRightClickDelete: (event: React.MouseEvent<HTMLElement>) => void;
  scanObjectId?: string;
}

function RightClickMenu({
  show,
  xCoordinate,
  yCoordinate,
  handleClickAway,
  handleRightClickDelete,
}: menuProps) {
  return show ? (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div onContextMenu={(evt) => evt.preventDefault()}>
        <Popper transition open>
          <Paper
            sx={{
              position: "fixed",
              borderRadius: "8px",
              top: `${yCoordinate}px`,
              left: `${xCoordinate}px`,
            }}
            data-testid="RightClickPopper"
          >
            <MenuItem onClick={handleRightClickDelete}>
              <Typography
                variant="body4"
                sx={{ color: COLORS.BETA_SECONDARY_ACCENT_RED }}
              >
                Delete
              </Typography>
            </MenuItem>
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  ) : (
    <></>
  );
}

export default RightClickMenu;
