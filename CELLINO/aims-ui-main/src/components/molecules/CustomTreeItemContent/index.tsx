// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { TreeItemContentProps, useTreeItem } from "@mui/lab";
import { Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

export interface CustomTreeItemContentProps extends TreeItemContentProps {
  handleFetchOnExpansion?: (arg: boolean) => void;
}

export const CustomTreeItemContent = React.forwardRef(
  (props: CustomTreeItemContentProps, ref) => {
    const { handleExpansion, expanded } = useTreeItem(props.nodeId);
    const { handleFetchOnExpansion } = props;

    const handleExpansionClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      handleExpansion(event);
    };

    React.useEffect(() => {
      if (expanded) {
        handleFetchOnExpansion?.(true);
      }
    }, [expanded, handleFetchOnExpansion]);

    return (
      <div
        style={{
          paddingTop: "8px",
        }}
      >
        <div
          className={clsx(props.className, props.classes.root)}
          ref={ref as React.Ref<HTMLDivElement>}
        >
          <div
            css={{
              width: "3px",
              height: "40px",
              backgroundColor: props.color ?? "red",
              marginRight: "9%",
            }}
          />
          <div
            onClick={handleExpansionClick}
            className={props.classes.iconContainer}
          >
            {props.expansionIcon}
          </div>
          <Typography component="div">{props.label}</Typography>
        </div>
      </div>
    );
  }
);
