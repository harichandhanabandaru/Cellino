import * as React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

import { IconAIMS } from "../../atoms/icons/icon";
import { COLORS } from "../../../theme/Colors";

interface MenuItemProps {
  item: any;
  selected: boolean;
  onClick: any;
  disabled: boolean;
}

const LinkStyle = styled("div")(
  () => `
        text-transform: none;
        font-size: 14px;
        text-align: center;   
        white-space: nowrap;
        text-decoration: none;
        font-family: Space Grotesk;
        font-style: normal;
        font-weight: 500;
        line-height: 120.02%;
        display: flex;
        align-items: center;
        letter-spacing: 0.25px,
        margin-left: 10px;
        color: #979598;
  `
);

export function MenuItemAIMS({
  selected,
  onClick,
  item,
  disabled,
}: MenuItemProps) {
  const changeIsSelected = () => {
    onClick();
  };

  return (
    <LinkStyle>
      <ListItem
        button
        disabled={disabled}
        key={item.id}
        sx={{
          height: "60px",
          ...(selected && {
            backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            borderRadius: "12px",
          }),
        }}
        onClick={changeIsSelected}
      >
        <ListItemIcon>
          <IconAIMS
            source={item.imgSource}
            isSelectable={true}
            isclicked={selected}
          />
        </ListItemIcon>
        {selected ? (
          <Typography variant="body3">{item.name}</Typography>
        ) : (
          <ListItemText secondary={item.name}></ListItemText>
        )}
      </ListItem>
    </LinkStyle>
  );
}
