// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InputTextField from "../../atoms/InputTextField";
import { Badge, Button, Popover, Typography } from "@mui/material";
import { COLORS } from "../../../theme/Colors";

export interface MultiSelectSearchProps {
  label: string;
  setSearchTextList: any;
}

export default function MultiSelectSearch({
  label,
  setSearchTextList,
}: MultiSelectSearchProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [searchText, setSearchText] = React.useState(
    localStorage.getItem(label) ?? ""
  );

  const onFilterBtnClicked = () => {
    localStorage.setItem(label, searchText);
    const temp = searchText?.split(",").filter((element: any) => element);
    setSearchTextList(temp);
  };

  const handleClose = () => {
    onFilterBtnClicked();

    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <React.Fragment>
      <Badge
        badgeContent={
          localStorage
            .getItem(label)
            ?.split(",")
            .filter((element) => element).length ?? 0
        }
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            margin: "5px",
            height: "22px",
            width: "22px",
            fontFamily: "Space Grotesk",
            backgroundColor: COLORS.GAMMA_HEATMAP_400,
          },
        }}
      >
        <Button
          disableRipple
          variant="outlined"
          endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleClick}
          sx={{
            textTransform: "none",
            borderRadius: "15px",
            color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
            border: `1px solid ${COLORS.GAMMA_HEATMAP_300}`,
            backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            "&:hover": {
              backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            },
          }}
        >
          <Typography
            variant={"caption"}
            sx={{
              fontFamily: "Space Grotesk",
              color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
            }}
          >
            {label}
          </Typography>
        </Button>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: "240px",
            boxShadow: "0px 4px 24px 0px #0000001A",
            borderRadius: "16px",
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              gap: 4,
              justifyItems: "center",
            }}
          >
            <InputTextField value={searchText} setSearchText={setSearchText} />
            <Button
              variant="contained"
              disabled={searchText.length > 0 ? false : true}
              sx={{
                borderRadius: "12px",
                width: "142px",
                height: "35px",
                marginBottom: "17px",
                bgcolor: "#8900FF",
                "&:hover": {
                  bgcolor: "#8900FF",
                },
              }}
              onClick={handleClose}
            >
              Filter
            </Button>
          </div>
        </ClickAwayListener>
      </Popover>
    </React.Fragment>
  );
}
