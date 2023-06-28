// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { Button, Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { COLORS } from "../../../../../theme/Colors";
import { PlateData } from "..";

const handleUnassignPlate = (
  index: number,
  setOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setOpenPopUp(true);
};

export const RenderPlateDetails = (
  props: GridRenderCellParams,
  setOpenUp: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedPlate: React.Dispatch<React.SetStateAction<any>>,
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>
) => {
  const { value } = props;
  return (
    <div
      style={{
        maxHeight: "150px",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxHeight: "120px",
          overflowY: "scroll",
        }}
      >
        {value.map((element: PlateData, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridAutoFlow: "column",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Typography variant={"caption2"}>
                  {`${element.runName} ${element.name}`}
                </Typography>
              </div>
              <div>
                <Button
                  style={{
                    maxWidth: "30px",
                    maxHeight: "20px",
                    minWidth: "30px",
                    minHeight: "20px",
                    color: COLORS.BETA_TEXT_LOW_EMPHASIS,
                  }}
                  onClick={() => {
                    setSelectedPlate(element?.id);
                    setSelectedUser(props.row.id);
                    handleUnassignPlate(index, setOpenUp);
                  }}
                >
                  x
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
