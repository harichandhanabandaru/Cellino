import * as React from "react";
import {
  Autocomplete,
  AutocompleteCloseReason,
  autocompleteClasses,
  SvgIcon,
  Typography,
  ClickAwayListener,
  styled,
  InputBase,
  Box,
  Grid,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WellSelectorItem from "../../atoms/WellSelectorItem";
import { COLORS } from "../../../theme/Colors";
import { ReactComponent as search } from "../../../assets/search.svg";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { WELL_STATUS } from "../../../constants";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    borderRadius: "0px 0px 12px 12px",
    backgroundColor: COLORS.GAMMA_BACKGROUND_02,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    paddingTop: "3px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
    [`& .${autocompleteClasses.option}`]: {
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const WellSelector = ({
  wellList,
  selectedWellId,
  handleChange,
}: {
  wellList: {
    id: string;
    position: string;
    reviewStatus: string;
  }[];
  selectedWellId: string;
  handleChange: (arg: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const selectedWell = wellList.find((well) => well.id === selectedWellId);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleWellChange = (wellId: string) => {
    setAnchorEl(null);
    if (selectedWellId !== wellId) {
      handleChange(wellId);
    }
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Box>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          border: "1px solid white",
          borderRadius: "12px",
          bgcolor: COLORS.GAMMA_BACKGROUND_02,
          width: "140px",
          height: "43px",
          cursor: "pointer",
          p: "0px 15px",
        }}
        data-testid="wellSelector"
        onClick={handleClick}
      >
        <Grid
          item
          container
          xs={8}
          columnGap={1}
          alignItems="center"
          sx={{ pl: 1 }}
        >
          {selectedWell?.reviewStatus &&
            selectedWell.reviewStatus === WELL_STATUS.COMPLETED && (
              <CheckBoxIcon
                sx={{
                  color: COLORS.BETA_SECONDARY_ACCENT_GREEN,
                  pl: "12px",
                }}
              />
            )}
          {selectedWell?.reviewStatus &&
            (selectedWell.reviewStatus === WELL_STATUS.IN_REVIEW ||
              selectedWell.reviewStatus === WELL_STATUS.NOT_STARTED) && (
              <FiberManualRecordIcon
                sx={{
                  color: `${
                    selectedWell.reviewStatus === WELL_STATUS.IN_REVIEW
                      ? "#FFC800"
                      : "#979598"
                  }`,
                  pl: "12px",
                }}
              />
            )}
          <Typography sx={{ color: "black", fontSize: "16px" }}>
            {selectedWell?.position}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <ExpandMoreIcon
            sx={{
              transform: !open ? "rotate(0deg)" : "rotate(180deg)",
              color: "black",
              mt: "9px",
            }}
          />
        </Grid>
      </Grid>
      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={{ position: "absolute", top: "48px" }}>
            <Autocomplete
              open
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              onChange={(event) => {
                if (
                  event.type === "keydown" &&
                  (event as React.KeyboardEvent).key === "Backspace"
                ) {
                  return;
                }
              }}
              sx={{ width: "140px", pt: "0px", zIndex: 100 }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No Options"
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{ bgcolor: COLORS.GAMMA_BACKGROUND_02 }}
                  onClick={() => handleWellChange(option.id)}
                >
                  <WellSelectorItem
                    name={option.position}
                    status={option.reviewStatus}
                  />
                </Box>
              )}
              options={wellList}
              getOptionLabel={(option) => option.position}
              renderInput={(params) => (
                <InputBase
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  startAdornment={
                    <Box>
                      <SvgIcon
                        component={search}
                        sx={{
                          fill: "none",
                          bgcolor: "white",
                          fontSize: "18px",
                          position: "relative",
                          left: "23px",
                          top: "3px",
                        }}
                      />
                    </Box>
                  }
                  placeholder="Search"
                  sx={{
                    p: "15px 28px 0px 0px",
                    bgcolor: COLORS.GAMMA_BACKGROUND_02,

                    "& input": {
                      bgcolor: "white",
                      borderRadius: "6px",
                      pl: "25px",
                      fontSize: "17px",
                    },
                  }}
                />
              )}
            />
          </Box>
        </ClickAwayListener>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default WellSelector;
