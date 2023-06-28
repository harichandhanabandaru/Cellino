// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import {
  Step,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  StepperProps,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import { StepConnector } from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";
import { PlateEvent } from "../../pages/PlateViewPage";

export interface IStepperProps extends StepperProps {
  listOfEvents: Array<any>;
  date: string;
  runDay: string;
  selectedEventImageId: PlateEvent;
  setSelectedEventImageId: (event: PlateEvent) => void;
  islastImage?: boolean;
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: COLORS.BETA_SECONDARY_GREY,
    borderWidth: 2,
    borderRadius: 2,
  },
  width: "26px",
  ".MuiStepConnector-line": {
    width: "26px",
  },
}));

const HeatMapStepperItem = (props: IStepperProps) => {
  const {
    listOfEvents,
    runDay,
    date,
    selectedEventImageId,
    setSelectedEventImageId,
    islastImage,
  } = props;

  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        height: "60px",
        gap: 2,
      }}
    >
      <Typography
        variant="caption1"
        color={COLORS.BETA_SECONDARY_GREY}
        sx={{ textTransform: "none", textAlign: "center" }}
      >
        {date}
      </Typography>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
        }}
      >
        <Divider
          orientation="vertical"
          sx={{ height: "26px", width: "1px" }}
          style={{
            border: `1px solid ${COLORS.BETA_SECONDARY_GREY}`,
            backgroundColor: COLORS.BETA_SECONDARY_GREY,
          }}
        />
        <Divider
          orientation="horizontal"
          sx={{ width: "28px", alignSelf: "center", height: "1px" }}
          style={{
            border: `0.5px solid ${COLORS.BETA_SECONDARY_GREY}`,
            backgroundColor: COLORS.BETA_SECONDARY_GREY,
          }}
        />
        <Stepper
          connector={<CustomConnector />}
          sx={{
            ".MuiStep-root": { padding: 0 },
          }}
        >
          {listOfEvents.map((event, index) => {
            let TooltipInfo = () => (
              <div>
                {`Type: ${event?.eventType}`}
                <br />
                {`Started at: ${new Date(event?.startedAt)
                  .toLocaleTimeString("it-IT")
                  .slice(0, 5)}`}
                <br />
                {`Completed at: ${new Date(event?.completedAt)
                  .toLocaleTimeString("it-IT")
                  .slice(0, 5)}`}
              </div>
            );
            return (
              <Step key={index}>
                <Tooltip title={<TooltipInfo />} arrow>
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-iconContainer": {
                        padding: 0,
                      },
                    }}
                    data-testid="label"
                    onClick={() => setSelectedEventImageId(event)}
                    icon={
                      <CircleIcon
                        sx={{
                          color:
                            event.id === selectedEventImageId?.id
                              ? COLORS.ALPHA_PRIMARY_PURPLE
                              : COLORS.BETA_SECONDARY_GREY,
                          marginRight: 0,
                          cursor: "pointer",
                        }}
                      />
                    }
                  ></StepLabel>
                </Tooltip>
              </Step>
            );
          })}
        </Stepper>
        <Divider
          orientation="horizontal"
          sx={{ width: "26px", alignSelf: "center", height: "1px" }}
          style={{
            border: `0.5px solid ${COLORS.BETA_SECONDARY_GREY}`,
            backgroundColor: COLORS.BETA_SECONDARY_GREY,
          }}
        />
        {islastImage && (
          <Divider
            orientation="vertical"
            sx={{ height: "26px", width: "2px" }}
            style={{
              border: `1.2px solid ${COLORS.BETA_SECONDARY_GREY}`,
              backgroundColor: COLORS.BETA_SECONDARY_GREY,
            }}
          />
        )}
      </div>
      <Typography
        variant="overline"
        color={COLORS.BETA_SECONDARY_GREY}
        sx={{ textTransform: "none", textAlign: "center" }}
      >
        {`Day ${runDay}`}
      </Typography>
    </div>
  );
};

export default HeatMapStepperItem;
