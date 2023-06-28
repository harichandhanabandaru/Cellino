// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Card, CardContent, Box, Typography, Tooltip } from "@mui/material";
import { COLORS } from "../../../theme/Colors";
import { useNavigate } from "react-router-dom";
import { formatName } from "../../../utils/formatName";
import {
  PHASES,
  PLATE_OR_WELL_PROCESS_STATUS,
  PLATE_STATUS,
} from "../../../constants";
import { ROUTES } from "../../../constants";

const fetchPlateViewPage = () => import("../../pages/PlateViewPage");

interface CardBoxProps {
  cardDetails: any;
  phaseName?: string;
}

const TypographyLabelStyle = {
  color: COLORS.BETA_TEXT_LOW_EMPHASIS,
  marginRight: "4px",
  textTransform: "none",
};

const TypographyValueStyle = {
  color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
  textTransform: "none",
};

export default function CardBox({ cardDetails, phaseName }: CardBoxProps) {
  let navigate = useNavigate();
  const handlePlateSelect = () => {
    navigate({
      pathname: `${ROUTES.PLATE}/${cardDetails.id}`,
    });
  };

  let runOwnerName = formatName(
    cardDetails?.run?.runOwner?.firstName,
    cardDetails?.run?.runOwner?.lastName
  );

  let reviewers: string[] =
    cardDetails.reviewers &&
    cardDetails?.reviewers?.map(
      (ele: { firstName: string; lastName: string }) =>
        formatName(ele.firstName, ele.lastName)
    );

  let reviewersDisplay = "-";
  if (reviewers) {
    if (reviewers.length === 1) {
      reviewersDisplay = reviewers[0];
    } else if (reviewers.length > 1) {
      reviewersDisplay = reviewers.length + "";
    }
  }

  return (
    <div
      style={{
        display: "grid",
      }}
      onMouseEnter={() => fetchPlateViewPage()}
    >
      <div
        style={{
          width: "96%",
        }}
      >
        <Card
          data-testid="plateCard"
          variant="outlined"
          sx={{
            borderRadius: "15px",
            cursor: "pointer",
            borderColor:
              cardDetails.processStatus === PLATE_OR_WELL_PROCESS_STATUS.RETIRED
                ? COLORS.BETA_SECONDARY_GREY
                : cardDetails?.plateStatus === PLATE_STATUS.DROP
                ? COLORS.BETA_SECONDARY_ACCENT_RED
                : "none",
          }}
          onClick={handlePlateSelect}
        >
          <CardContent
            sx={{
              "&.MuiCardContent-root": {
                padding: "8px 15px",
                height:
                  cardDetails.plateStatus === PLATE_STATUS.DROP ||
                  cardDetails.processStatus ===
                    PLATE_OR_WELL_PROCESS_STATUS.RETIRED
                    ? "187px"
                    : "184px",
              },
            }}
          >
            {/* Run name*/}
            <div
              css={{
                display: "grid",
                gridAutoFlow: "row",
                gap: "6px",
              }}
            >
              <div>
                {cardDetails?.run.name.toString().length > 30 ? (
                  <Tooltip title={cardDetails?.run.name} arrow>
                    <Typography
                      variant="caption2"
                      sx={{
                        ...TypographyValueStyle,
                        color: COLORS.ALPHA_PRIMARY_PURPLE,
                      }}
                    >
                      {`${cardDetails?.run.name.slice(0, 30)}...`}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography
                    variant={"caption2"}
                    sx={{
                      ...TypographyValueStyle,
                      color: COLORS.ALPHA_PRIMARY_PURPLE,
                    }}
                  >
                    {cardDetails?.run.name}
                  </Typography>
                )}
              </div>
              {/* Partner name*/}
              <div
                style={{
                  display: "grid",
                  gridAutoFlow: "row",
                }}
              >
                <Typography variant="overline" sx={TypographyLabelStyle}>
                  For
                </Typography>
                <Typography
                  variant="caption2"
                  sx={{
                    color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
                  }}
                >
                  {cardDetails?.run?.partner?.name || "-"}
                </Typography>
              </div>
              {/* Plate name and Run Id */}
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                }}
              >
                <div
                  css={{
                    display: "grid",
                    gridAutoFlow: "row",
                  }}
                >
                  <Typography variant="overline" sx={TypographyLabelStyle}>
                    Plate Name
                  </Typography>
                  <Tooltip title={cardDetails?.name} arrow>
                    <Typography
                      variant="caption2"
                      sx={{
                        ...TypographyValueStyle,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {cardDetails?.name}
                    </Typography>
                  </Tooltip>
                </div>
                {/* Run id */}
                <div
                  css={{
                    display: "grid",
                    gridAutoFlow: "row",
                  }}
                >
                  <Typography variant="overline" sx={TypographyLabelStyle}>
                    Run ID
                  </Typography>
                  <Tooltip title={cardDetails?.run?.id} arrow>
                    <Typography
                      variant="caption2"
                      sx={{
                        ...TypographyValueStyle,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {cardDetails?.run?.id}
                    </Typography>
                  </Tooltip>
                </div>
              </div>
              {/* Passage Number  and days to down selection*/}
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                }}
              >
                {phaseName === PHASES.CLONE_ISOLATION && (
                  <div
                    style={{
                      display: "grid",
                      gridAutoFlow: "row",
                    }}
                  >
                    <Typography variant="overline" sx={TypographyLabelStyle}>
                      Days to downselection
                    </Typography>
                    <Typography
                      variant="caption2"
                      sx={{
                        color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                      }}
                    >
                      {cardDetails?.processMetadata?.downSelectionDay ?? "-"}
                    </Typography>
                  </div>
                )}
                {/* Passage */}
                <div
                  style={{
                    display: "grid",
                    gridAutoFlow: "row",
                  }}
                >
                  <Typography variant="overline" sx={TypographyLabelStyle}>
                    Passage
                  </Typography>
                  <Typography
                    variant="caption2"
                    sx={{
                      color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                    }}
                  >
                    {cardDetails?.processMetadata?.passage_number ?? "-"}
                  </Typography>
                </div>
              </div>
              {/* Run owner and Reviewer */}
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div
                  css={{
                    display: "grid",
                  }}
                >
                  <Typography variant="overline" sx={TypographyLabelStyle}>
                    Run owner
                  </Typography>
                  <Tooltip
                    title={runOwnerName}
                    placement={"bottom-start"}
                    arrow
                  >
                    <Typography
                      variant="caption2"
                      sx={{
                        ...TypographyValueStyle,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {runOwnerName}
                    </Typography>
                  </Tooltip>
                </div>
                <div
                  css={{
                    display: "grid",
                    alignContent: "center",
                  }}
                >
                  <Typography variant="overline" sx={TypographyLabelStyle}>
                    Reviewer
                  </Typography>

                  <Typography variant="caption2" sx={TypographyValueStyle}>
                    {reviewers?.length ? (
                      <Tooltip
                        title={reviewers.map((ele: string) => (
                          <div>
                            {ele}
                            <br />
                          </div>
                        ))}
                        arrow
                      >
                        <Typography
                          variant="caption2"
                          sx={{
                            ...TypographyValueStyle,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            width: "75px",
                          }}
                        >
                          {reviewersDisplay}
                        </Typography>
                      </Tooltip>
                    ) : (
                      "-"
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>

          {(cardDetails.plateStatus === PLATE_STATUS.DROP ||
            cardDetails.processStatus ===
              PLATE_OR_WELL_PROCESS_STATUS.RETIRED) && (
            <Box
              alignSelf={"flex-end"}
              sx={{
                backgroundColor:
                  cardDetails.processStatus ===
                  PLATE_OR_WELL_PROCESS_STATUS.RETIRED
                    ? COLORS.GAMMA_BACKGROUND_03
                    : COLORS.BETA_SECONDARY_LIGHTRED,
                height: "13px",
                fontFamily: ["Space Grotesk", "sans-serif"].join(","),
                fontSize: "10px",
                fontWeight: 500,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "15px",
                letterSpacing: "0.25px",
                textAlign: "right",
                color:
                  cardDetails.processStatus ===
                  PLATE_OR_WELL_PROCESS_STATUS.RETIRED
                    ? COLORS.BETA_TEXT_LOW_EMPHASIS
                    : COLORS.BETA_SECONDARY_ACCENT_RED,
                padding: "0px 10px",
              }}
            >
              {cardDetails.processStatus ===
              PLATE_OR_WELL_PROCESS_STATUS.RETIRED
                ? PLATE_OR_WELL_PROCESS_STATUS.RETIRED
                : PLATE_OR_WELL_PROCESS_STATUS.DROPPED}
            </Box>
          )}
          {cardDetails.plateStatus !== PLATE_STATUS.DROP &&
            cardDetails.processStatus !==
              PLATE_OR_WELL_PROCESS_STATUS.RETIRED && (
              <Box
                sx={{
                  height: "13px",
                }}
              ></Box>
            )}
        </Card>
      </div>
    </div>
  );
}
