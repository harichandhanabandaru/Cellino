// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { useAssignReviewerToPlatesMutation } from "../../../generated/graphql";
import { AssignPlateData } from "../ReviewersView/AssignPlatesTab";
import { COLORS } from "../../../theme/Colors";

const icon = (
  <CheckBoxOutlineBlankIcon
    fontSize="small"
    sx={{ color: COLORS.BETA_SECONDARY_GREY }}
  />
);
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const indeterminateIcon = <IndeterminateCheckBoxIcon fontSize="small" />;

// Prop interface
interface AssignPlatesProps {
  items: AssignPlateData[];
  loadMoreItems: () => void;
  totalElements: number;
  userId: string;
  refetch: () => void;
}

const emptyArray: AssignPlateData[] = [];

// Component
const AssignPlates = (props: AssignPlatesProps) => {
  // States
  const [data, setData] = useState<AssignPlateData[]>(emptyArray);
  const [result, setResult] = useState<AssignPlateData[]>(emptyArray);
  const [searchString, setSearchString] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [totalFetchedPlatesCount, setTotalFetchedPlatesCount] =
    useState<number>(0);

  // Mutations
  const [assignReviewer] = useAssignReviewerToPlatesMutation();

  // Callbacks
  // Open the popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Closing the popover
  const handleClose = () => {
    setSearchString("");
    setAnchorEl(null);
  };

  // Textfield onChange handler
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value || "");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // This is a callback which will assign multiple plates to a given user.
  // Once the data query is sent the data is refetched in the parent using the props.
  const assignPlates = () => {
    const plateArray: string[] = [];
    data?.forEach((ele) =>
      plateArray.push(
        ...ele.plates.filter((plate) => plate.checked).map((plate) => plate.id)
      )
    );

    assignReviewer({
      variables: {
        plateIds: plateArray,
        userId: props.userId,
      },
    }).then(() => {
      props.refetch();
    });

    handleClose();
  };

  // This handleChange is for when the use selects the parent all the children should get selected.
  const handleChange =
    (runId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (data !== undefined) {
        const tempData = data.filter(
          (run: AssignPlateData) => run.runId === runId
        );

        tempData[0].checked = event.target.checked;
        if (tempData[0].plates) {
          tempData[0].plates.forEach(
            (plate) => (plate.checked = event.target.checked)
          );
        }
        setData(tempData);
      }
    };

  // Similar to the above function but to the inner options or childrens.
  const handleChangeChildren =
    (runId: string, plateId: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (data !== undefined) {
        const tempData = data.filter(
          (run: AssignPlateData) => run.runId === runId
        );

        const plate = tempData[0].plates.filter(
          (plate) => plate.id === plateId
        );
        plate[0].checked = event.target.checked;

        tempData[0].checked = tempData[0].plates.every(
          (plate) => plate.checked
        );

        setData(tempData);
      }
    };

  // UseEffects to update the component.
  // Initial load of data
  useEffect(() => {
    setData(props.items);
  }, [props.items]);

  // This useEffect is for the updating the AssignPlates Popper with relevant data.
  useEffect(() => {
    if (data) {
      // Store the length
      setTotalFetchedPlatesCount(
        data
          .map((run) => run.plates.length)
          .reduce((sum, current) => sum + current, 0)
      );

      // Filter data which have the matching `searchString`
      let filteredData: AssignPlateData[] = data?.filter(
        (ele: AssignPlateData) => {
          if (searchString !== "") {
            return (
              ele.plates.filter((e) =>
                e.name.toLowerCase().includes(searchString.toLowerCase())
              ).length > 0
            );
          } else {
            return true;
          }
        }
      );
      // Once filteres, map the objects which are in the search string and create new objects.
      if (filteredData.length !== 0) {
        filteredData = filteredData?.map((ele) => {
          return {
            runId: ele.runId,
            runName: ele.runName,
            checked: ele.checked,
            plates: ele.plates.filter((e) =>
              e.name.toLowerCase().includes(searchString.toLowerCase())
            ),
          };
        });
      }

      // Set the dropdown result.
      setResult(filteredData);
    }
  }, [data, searchString]);

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        sx={{
          width: "144px",
          borderRadius: "2px",
          backgroundColor: COLORS.GAMMA_BACKGROUND_02,
          color: "#656267",
          "&:hover": {
            backgroundColor: COLORS.GAMMA_BACKGROUND_02,
          },
        }}
      >
        <Typography variant="caption2" textTransform="none">
          Assign plate
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          backgroundColor: "transparent",
          "& .MuiPaper-root": {
            borderRadius: "16px",
            boxShadow: "0px 0px 44px 0px #b0b7c363",
          },
        }}
        elevation={0}
      >
        <div
          css={{
            width: "235px",
            height: "350px",
          }}
        >
          <TextField
            variant="standard"
            sx={{
              width: "90%",
              marginLeft: "14px",
              margin: "0px 5%",
              borderRadius: "2px",
              backgroundColor: COLORS.GAMMA_BACKGROUND_02,
              marginTop: "16px",
              "& .MuiInputBase-input": {
                fontWeight: 400,
                fontSize: "14px",
              },
            }}
            type="text"
            placeholder="Search"
            onChange={onChangeHandler}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: COLORS.BETA_SECONDARY_GREY }} />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant={"caption2"} sx={{ marginLeft: "19px" }}>
            Unassigned Plates
          </Typography>
          <Box sx={{ height: "65%", overflowY: "scroll" }}>
            <div>
              <div style={{ marginLeft: "39px" }}>
                {result &&
                  result.map((run) => (
                    <div key={run.runId}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        indeterminateIcon={indeterminateIcon}
                        indeterminate={
                          run.plates.some((plate) => plate.checked) &&
                          !run.plates.every((plate) => plate.checked)
                        }
                        checked={run.checked}
                        style={{ padding: "4px" }}
                        onChange={handleChange(run.runId)}
                        data-testid={`run-checkbox-${run.runName}`}
                        // value={run.runId}
                      />
                      <Typography variant={"caption1"}>
                        {run.runName}
                      </Typography>
                      {run.plates.map((plate) => {
                        return (
                          <div
                            css={{ marginLeft: "15px" }}
                            key={plate.id}
                            data-testid={`plate-${plate.name}`}
                          >
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={plate.checked}
                              style={{ padding: "4px" }}
                              onChange={handleChangeChildren(
                                run.runId,
                                plate.id
                              )}
                              // value={plate.id}
                              data-testid={`plate-checkbox-${plate.name}`}
                            />
                            <Typography variant={"caption1"}>
                              {plate.name}
                            </Typography>
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </div>
              {totalFetchedPlatesCount < props.totalElements && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="text"
                    onClick={props.loadMoreItems}
                    sx={{ fontSize: "12px" }}
                  >
                    Show more
                  </Button>
                </div>
              )}
            </div>
          </Box>

          <Button
            aria-describedby={id}
            variant="contained"
            onClick={assignPlates}
            sx={{ borderRadius: "8px", width: "60%", margin: "0px 20%" }}
            data-testid={"assign-plates-button"}
          >
            Assign
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default AssignPlates;
