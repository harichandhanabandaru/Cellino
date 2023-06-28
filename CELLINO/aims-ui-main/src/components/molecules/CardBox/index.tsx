import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";

import cardImageIcon from "../../../assets/imaging.png";
import cardKeepIcon from "../../../assets/keep.png";
import cardInQueueIcon from "../../../assets/in_queue.png";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";

interface CardBoxProps {
  cardDetails: any;
}

export default function CardBox({ cardDetails }: CardBoxProps) {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "15px", width: "287px", marginTop: "50px" }}
    >
      <CardContent>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography
              variant="overline"
              sx={{ color: COLORS.ALPHA_PRIMARY_PURPLE }}
            >
              {cardDetails.title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item sx={{ marginTop: "5px" }}>
                <img src={cardImageIcon} alt={"card Icon"} />
              </Grid>
              <Grid item sx={{ marginTop: "5px" }}>
                <img src={cardInQueueIcon} alt={"Card in-queue Icon"} />
              </Grid>
              <Grid item sx={{ marginTop: "5px" }}>
                <img src={cardKeepIcon} alt={"Card Keep Icon"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "-8px" }}>
          <Grid item>
            <Typography
              variant="overline"
              sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS, marginRight: "4px" }}
            >
              For
            </Typography>
            <Typography
              variant="caption2"
              sx={{ color: COLORS.BETA_TEXT_HIGH_EMPHASIS }}
            >
              {cardDetails.for}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ marginTop: "-8px" }}
        >
          <Grid item>
            <Typography
              variant="overline"
              sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS, marginRight: "4px" }}
            >
              Run ID
            </Typography>
            <Typography
              variant="caption2"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              {cardDetails.runId}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="overline"
              sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS, marginRight: "4px" }}
            >
              Plate Name
            </Typography>
            <Typography
              variant="caption2"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              {cardDetails.plateName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "-8px" }}>
          <Grid item>
            <Typography
              variant="overline"
              sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS, marginRight: "4px" }}
            >
              Days until downselection
            </Typography>
            <Typography
              variant="caption2"
              sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
            >
              {cardDetails.downselectionDays}
            </Typography>
          </Grid>
        </Grid>
        <LinearProgress
          data-testid={"ProgressBar"}
          sx={{
            marginTop: "10px",
            height: "5px",
            backgroundColor: `${COLORS.GAMMA_BACKGROUND_04}`,
            borderRadius: "45px",
            "& .MuiLinearProgress-bar": {
              backgroundColor: `${COLORS.BETA_SECONDARY_ACCENT_YELLOW}`,
              borderRadius: "45px",
            },
          }}
          variant="determinate"
          value={(cardDetails.noOfWellsCompleted * 100) / 12}
        />
        <Grid container sx={{ marginTop: "-5px" }}>
          <Grid item>
            <Typography
              variant="subtitle5"
              sx={{ color: COLORS.ALPHA_PRIMARY_PURPLE, marginRight: "4px" }}
            >
              {`${cardDetails.noOfWellsCompleted}/12`}
            </Typography>
            <Typography
              variant="caption2"
              sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS }}
            >
              wells completed
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item sx={{ marginTop: "-8px" }}>
            <Grid container direction={"column"}>
              <Grid item>
                <Typography
                  variant="overline"
                  sx={{
                    color: COLORS.BETA_TEXT_LOW_EMPHASIS,
                    marginRight: "4px",
                  }}
                >
                  Run owner
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                    marginTop: "-10px",
                  }}
                >
                  {cardDetails.runOwner}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ marginTop: "-8px" }}>
            <Grid container direction={"column"}>
              <Grid item>
                <Typography
                  variant="overline"
                  sx={{
                    color: COLORS.BETA_TEXT_LOW_EMPHASIS,
                    marginRight: "4px",
                  }}
                >
                  Assigned to
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                    marginTop: "-10px",
                  }}
                >
                  {cardDetails.assignedTo}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ marginTop: "8px" }}>
            <Grid container>
              <Grid item sx={{ marginTop: "5px", marginRight: "2px" }}>
                <ChatTwoToneIcon
                  sx={{
                    "&.MuiSvgIcon-root": { color: COLORS.BETA_SECONDARY_GREY },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant={"body4"}>24</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ marginTop: "8px" }}>
            <Grid container>
              <Grid item sx={{ marginTop: "4px", marginRight: "2px" }}>
                <PeopleAltTwoToneIcon
                  sx={{
                    "&.MuiSvgIcon-root": { color: COLORS.BETA_SECONDARY_GREY },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant={"body4"}>5</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
