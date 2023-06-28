// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import * as React from "react";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import {
  Badge,
  Button,
  InputAdornment,
  Popover,
  Typography,
} from "@mui/material";

import { COLORS } from "../../../theme/Colors";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(() => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
  },
  [`& .${autocompleteClasses.listbox}`]: {
    [`& .${autocompleteClasses.option}`]: {
      paddingLeft: 0,
      '&[aria-selected="true"]': {
        backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
      },
    },
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

export interface ID {
  id: string;
}
const StyledInput = styled(InputBase)(() => ({
  border: `1px solid #eaecef`,
}));

/**
 * Interface for `MultiselectList`.
 */
export interface MultiselectListProps<T extends ID> {
  /**
   * @param label Renders the label on the chip
   */
  label: string;
  /**
   * @param data Used to. render the list of objects
   */
  data: T[];
  /**
   * @param selecteData Mainly used to getting the count of objects.
   */
  selectedData: T[];
  /**
   * @param setSelectedData Used to set the data which is checked.
   */
  setSelectedData: React.Dispatch<React.SetStateAction<T[]>>;
  /**
   * @param renderOption Similar to the Autocomplete `renderOption` prop.
   */
  renderOption: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  /**
   * @param getOptionLabel Similar to the Autocomplete `getOptionLabel` prop.
   */
  getOptionLabel: (option: T) => string;
}

/**
 * Renders list of values, with search functionality.
 */
export default function MultiselectList<T extends ID>(
  props: MultiselectListProps<T>
) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pendingValue, setPendingValue] = React.useState<T[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    let filteredArray: any[] = [];
    props.data.forEach((ele: any) => {
      if (props.selectedData.map((e) => e.id).includes(ele.id)) {
        filteredArray.push(ele);
      }
    });
    setPendingValue(filteredArray);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    let filteredArray = pendingValue.map((value: any) => {
      return value;
    });
    props.setSelectedData(filteredArray);
    localStorage.setItem(props.label, JSON.stringify(filteredArray));
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Badge
        badgeContent={props.selectedData.length}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            margin: "5px",
            height: "22px",
            width: "22px",
            fontFamily: "Space Grotesk",
            backgroundColor: COLORS.GAMMA_HEATMAP_400,
          },
        }}
      >
        <Button
          disableRipple
          variant="outlined"
          endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleClick}
          sx={{
            textTransform: "none",
            borderRadius: "15px",
            color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
            border: `1px solid ${COLORS.GAMMA_HEATMAP_300}`,
            backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            "&:hover": {
              backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            },
          }}
        >
          <Typography
            variant={"caption"}
            sx={{
              fontFamily: "Space Grotesk",
              color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
            }}
          >
            {props.label}
          </Typography>
        </Button>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: "240px",
            boxShadow: "0px 4px 24px 0px #0000001A",
            borderRadius: "16px",
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div
            css={{
              display: "grid",
              gridAutoFlow: "row",
              gap: 4,
              justifyItems: "center",
            }}
          >
            <Autocomplete
              open
              multiple
              data-testid="autocomplete"
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === "keydown" &&
                  (event as React.KeyboardEvent).key === "Backspace" &&
                  reason === "removeOption"
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No results found"
              renderOption={props.renderOption} // Try to reuse renderer components as the checkbox needs to be manually provided inside the renderer for now.
              options={[...props.data].sort((a, b) => {
                // Display the selected items first.
                let ai = props.selectedData.indexOf(a);
                ai =
                  ai === -1
                    ? props.selectedData.length + props.data.indexOf(a)
                    : ai;
                let bi = props.selectedData.indexOf(b);
                bi =
                  bi === -1
                    ? props.selectedData.length + props.data.indexOf(b)
                    : bi;
                return ai - bi;
              })}
              getOptionLabel={props.getOptionLabel}
              renderInput={(params) => (
                <StyledInput
                  sx={{
                    marginTop: "12px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    fontWeight: "400",
                    background: COLORS.GAMMA_BACKGROUND_02,
                    width: "207px",
                  }}
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{
                        marginLeft: "15px",
                      }}
                    >
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  }
                  placeholder="Search"
                />
              )}
            />
            <Button
              variant="contained"
              disabled={pendingValue.length === 0 ? true : false}
              sx={{
                borderRadius: "12px",
                width: "142px",
                height: "35px",
                marginBottom: "17px",
                bgcolor: "#8900FF",
                "&:hover": {
                  bgcolor: "#8900FF",
                },
              }}
              onClick={handleClose}
            >
              Filter
            </Button>
          </div>
        </ClickAwayListener>
      </Popover>
    </React.Fragment>
  );
}
