// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { IconButton, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as LeftChevronIcon } from "../../../assets/angle-left.svg";
import { ReactComponent as RightChevronIcon } from "../../../assets/angle-right.svg";
import { ReactComponent as LeftChevronDisabledIcon } from "../../../assets/angle-left-disabled.svg";
import { ReactComponent as RightChevronDisableIcon } from "../../../assets/angle-right-disabled.svg";
import { COLORS } from "../../../theme/Colors";

interface HeatMapDateRangeProps {
  handleDecreaseDate: () => void;
  handleIncreaseDate: () => void;
  imageEventData: any;
  timeFrameData: any;
}

const getDisabledState = (date1: string, date2: string) => {
  if (date1 && date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    return startDate.getTime() === endDate.getTime();
  }
  return true;
};

const getDate = (date: string) => {
  if (date) {
    const currentDate = new Date(date);
    return currentDate.toUTCString().slice(5, 17);
  }
  return "";
};

const HeatMapDateRange = ({
  imageEventData,
  timeFrameData,
  handleDecreaseDate,
  handleIncreaseDate,
}: HeatMapDateRangeProps) => {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      {imageEventData && timeFrameData && (
        <IconButton
          disableRipple
          onClick={handleDecreaseDate}
          disabled={getDisabledState(
            imageEventData[imageEventData.length - 1]?.date,
            timeFrameData[0]?.date
          )}
        >
          {getDisabledState(
            imageEventData[imageEventData.length - 1]?.date,
            timeFrameData[0]?.date
          ) ? (
            <SvgIcon
              component={LeftChevronDisabledIcon}
              data-testid="left-chevron"
            />
          ) : (
            <SvgIcon component={LeftChevronIcon} />
          )}
        </IconButton>
      )}
      {timeFrameData && (
        <Typography
          variant="overline"
          color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
          sx={{ textTransform: "none" }}
        >
          {`${getDate(timeFrameData[0]?.date)}(Day ${
            timeFrameData[0]?.runDay ?? ""
          }) - ${getDate(timeFrameData[timeFrameData.length - 1]?.date)}(Day ${
            timeFrameData[timeFrameData.length - 1]?.runDay ?? ""
          })`}
        </Typography>
      )}
      {imageEventData && timeFrameData && (
        <IconButton
          disableRipple
          onClick={handleIncreaseDate}
          disabled={getDisabledState(
            imageEventData[0]?.date,
            timeFrameData[timeFrameData.length - 1]?.date
          )}
        >
          {getDisabledState(
            imageEventData[0]?.date,
            timeFrameData[timeFrameData.length - 1]?.date
          ) ? (
            <SvgIcon
              component={RightChevronDisableIcon}
              data-testid="right-chevron"
            />
          ) : (
            <SvgIcon component={RightChevronIcon} />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default HeatMapDateRange;
