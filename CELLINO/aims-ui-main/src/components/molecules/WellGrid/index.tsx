// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { Well } from "../../atoms/Well";
import React from "react";
import { PLATE_ATTRIBUTES } from "../../../constants";
import getColoniesAndCellsPercentage from "../../../utils/getColoniesAndCellsPercentage";
import { COLORS } from "../../../theme/Colors";
import memoize from "memoize-one";

const WELL_SIZE = 100;
export interface GridWellrops {
  rows: number;
  columns: number;
  wellValues: any[];
  onClick?: any;
  attributeValue: string;
  plateStatus: string;
  totalColonies: number;
  totalCells: number;
  plateProcessStatus: string;
  isCircular: boolean;
  aspectRatio: number;
}

const getBorderColor = (plateStatus: string, processStatus: string) => {
  if (processStatus === "RETIRED") {
    return `2px solid ${COLORS.BETA_TEXT_LOW_EMPHASIS}`;
  } else if (plateStatus === "DROP") {
    return `2px solid ${COLORS.BETA_SECONDARY_ACCENT_RED}`;
  } else {
    return "none";
  }
};

const getConfluenceValue = memoize(
  (
    wellValue: any,
    attributeValue: string,
    totalColonies: number,
    totalCells: number
  ) => {
    let gradient = 1;
    let isMLAttributeAvailable = false;
    //If we don't have the measurements itself, directly return false for iSMLAttributeAvailable
    if (wellValue === null) {
      isMLAttributeAvailable = false;
      return { gradient, isMLAttributeAvailable };
    }
    const ImageMeasuremets = wellValue;
    // else if we have measuremnets check the selected attribute value and if ml attributes are available or not
    if (attributeValue === PLATE_ATTRIBUTES.CONFLUENCE) {
      let confluence = ImageMeasuremets?.confluence;
      isMLAttributeAvailable = !!confluence;
      gradient = confluence * 100 ?? 1;
    }
    // interior confluence
    else if (attributeValue === PLATE_ATTRIBUTES.INTERIOR_CONFLUENCE) {
      let interiorConfluence = ImageMeasuremets?.interiorConfluence;
      isMLAttributeAvailable = !!interiorConfluence;
      gradient = Number(interiorConfluence * 100) ?? 1;
    }
    // cells
    else if (attributeValue === PLATE_ATTRIBUTES.CELLS) {
      let cells = Number(ImageMeasuremets?.cell_count);
      isMLAttributeAvailable = !!cells;
      gradient = getColoniesAndCellsPercentage(cells ?? 1, totalCells);
    }
    //colonies
    else if (attributeValue === PLATE_ATTRIBUTES.COLONIES) {
      let colonies = Number(ImageMeasuremets?.colonies);
      isMLAttributeAvailable = !!colonies;
      gradient = getColoniesAndCellsPercentage(colonies ?? 1, totalColonies);
    }
    //contamination score
    else if (attributeValue === PLATE_ATTRIBUTES.CONTAMINATION_SCORE) {
      let contaminationScore = Number(ImageMeasuremets?.contaminationScore);
      isMLAttributeAvailable = !!contaminationScore;
      contaminationScore === 0 ? (gradient = 10) : (gradient = 100);
    }
    return { gradient, isMLAttributeAvailable };
  }
);

export const WellGrid: React.FC<GridWellrops> = ({
  rows,
  columns,
  wellValues,
  onClick,
  attributeValue,
  plateStatus,
  totalColonies,
  totalCells,
  plateProcessStatus,
  isCircular,
  aspectRatio,
}) => {
  const iterate = () => {
    const grids = [];

    //logic for populating the well data
    const populateData = (row: number, column: number) => {
      const rowId = String.fromCharCode(63 + row);
      const columnId = column - 1 > 9 ? column - 1 : `${column - 1}`;
      for (let index in wellValues) {
        //compare well position with current row,column position
        if (wellValues[index]?.well?.position === rowId + columnId) {
          return Number(index) + 1;
        }
      }
      return undefined;
    };
    //populate wells based on no of rows and columns
    for (let i = rows + 1; i > 0; i--) {
      for (let j = columns + 1; j > 0; j--) {
        if (i === 1 && j > 1) {
          grids.push(
            <Typography
              sx={{
                gridRow: i,
                gridColumn: j,
                textAlign: "center",
                alignSelf: "end",
                marginBottom: "2vh",
              }}
              key={`${i} ${j}`}
              variant="body5"
            >
              {j - 1 > 9 ? j - 1 : `0${j - 1}`}{" "}
            </Typography>
          );
        } else if (i === 1 && j === 1) {
        } else if (j === 1 && i > 1) {
          grids.push(
            <Typography
              sx={{
                gridRow: i,
                gridColumn: j,
                justifySelf: "end",
                alignSelf: "center",
                textAlign: "end",
                marginRight: "2vh",
              }}
              key={`${i} ${j}`}
              variant="body5"
            >
              {String.fromCharCode(63 + i)}
            </Typography>
          );
        } else {
          const index = populateData(i, j);
          //for well in usage
          // get gradient and if ml attribute available for the required well
          const { gradient, isMLAttributeAvailable } = index
            ? getConfluenceValue(
                wellValues[index - 1].imageMeasurements,
                attributeValue,
                totalColonies,
                totalCells
              )
            : { gradient: 1, isMLAttributeAvailable: false };
          index
            ? grids.push(
                <Well
                  data-testid="seeded"
                  onClick={
                    wellValues[index - 1]?.artifactPath
                      ? () => onClick(wellValues[index - 1]?.well.id)
                      : () => {}
                  }
                  status={wellValues[index - 1]?.reviewStatus}
                  confluenceValue={gradient}
                  noImageData={!wellValues[index - 1]?.artifactPath}
                  isMLAttributeAvailable={isMLAttributeAvailable}
                  sx={{
                    gridRow: i,
                    gridColumn: j,
                    borderTop:
                      i === 2
                        ? getBorderColor(plateStatus, plateProcessStatus)
                        : "none",
                    borderLeft:
                      j === 2
                        ? getBorderColor(plateStatus, plateProcessStatus)
                        : "none",
                    borderRight:
                      j === columns + 1
                        ? getBorderColor(plateStatus, plateProcessStatus)
                        : "none",
                  }}
                  key={`${i} ${j}`}
                  wellStatus={wellValues[index - 1]?.well?.status}
                  isCircular={isCircular}
                  aspectRatio={aspectRatio}
                />
              )
            : //for wells in disabled state
              grids.push(
                <Well
                  sx={{
                    gridRow: i,
                    gridColumn: j,
                    borderTop:
                      i === 2
                        ? getBorderColor(plateStatus, plateProcessStatus)
                        : "none",
                    borderLeft:
                      j === 2
                        ? getBorderColor(plateStatus, plateProcessStatus)
                        : "none",
                    borderRight:
                      j === columns + 1
                        ? getBorderColor(plateStatus, plateProcessStatus)
                        : "none",
                  }}
                  key={`${i} ${j}`}
                  isCircular={isCircular}
                  aspectRatio={aspectRatio}
                />
              );
        }
      }
    }
    return grids;
  };

  return (
    <div>
      <div
        css={{
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: `3% repeat(auto-fill, ${WELL_SIZE}px)`,
        }}
      >
        {iterate()}
      </div>
      {(plateStatus === "DROP" || plateProcessStatus === "RETIRED") && (
        <div
          css={{
            width: columns * WELL_SIZE,
            display: "grid",
            height: "23px",
            border: `2px solid ${
              plateProcessStatus === "RETIRED"
                ? COLORS.BETA_TEXT_LOW_EMPHASIS
                : COLORS.BETA_SECONDARY_ACCENT_RED
            }`,
            backgroundColor: COLORS.GAMMA_BACKGROUND_04,
            justifyContent: "start",
            marginLeft: "3%",
          }}
        >
          <Typography
            variant="caption1"
            color={
              plateProcessStatus === "RETIRED"
                ? COLORS.BETA_TEXT_MEDIUM_EMPHASIS
                : COLORS.BETA_SECONDARY_ACCENT_RED
            }
            sx={{ marginRight: "6px" }}
          >
            {plateProcessStatus === "RETIRED"
              ? "PLATE RETIRED"
              : "PLATE DROPPED"}
          </Typography>
        </div>
      )}
    </div>
  );
};
