// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import { ListItem, ListItemButton, SvgIcon, Typography } from "@mui/material";
import { COLORS } from "../../../theme/Colors";

export interface ListItemProps {
  id: number;
  label: string;
  src: any;
  path: string;
}

function LeftNavPanelListItem({
  open,
  selectedItem,
  handleListItem,
  item,
}: {
  open: boolean;
  selectedItem: number;
  handleListItem: (itemId: number, itemPath: string) => void;
  item: ListItemProps;
}) {
  return (
    <div
      css={{
        paddingLeft: open ? "12px" : "unset",
        paddingRight: open ? "12px" : "unset",
      }}
    >
      <ListItem
        button
        disabled={
          !(
            item.label === "Runs" ||
            item.label === "Plates" ||
            item.label === "Reviewers"
          )
        }
        sx={{
          ...(selectedItem === item.id && {
            backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            borderRadius: "12px",
          }),
          "&:hover": {
            borderRadius: "12px",
          },
        }}
        data-testid={"listItem"}
        onClick={() => handleListItem(item.id, item.path)}
        disableGutters
      >
        <ListItemButton
          css={{
            justifyContent: open ? "initial" : "center",
            display: "grid",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          disableRipple
        >
          <div
            css={{
              display: "grid",
              gridAutoFlow: "column",
              gap: 16,
              justifyContent: open ? "start" : "center",
              alignItems: "center",
            }}
          >
            <SvgIcon
              htmlColor={selectedItem === item.id ? "#8900FF" : "#979598"}
              component={item.src}
            />
            {open && <Typography variant={"body5"}>{item.label}</Typography>}
          </div>
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default LeftNavPanelListItem;
