import * as React from "react";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import { COLORS } from "../../../theme/Colors";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(() => ({
  [`& .${autocompleteClasses.listbox}`]: {
    [`& .${autocompleteClasses.option}`]: {
      alignItems: "flex-start",
      paddingLeft: 5,
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

const StyledInput = styled(InputBase)(() => ({
  border: `1px solid #eaecef`,
}));

function stringAvatar(name: string) {
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
}

interface Assignees {
  img?: string;
  name: string;
  role: string;
}

const assignees = [
  { name: "Bogdan Kriven", role: "Reviewer" },
  { name: "John Doe", role: "Automation engineer" },
  { name: "Betty Betty", role: "Biologist" },
  { img: "./Rosy.png", name: "Rosie Rosie", role: "Reviewer" },
  { name: "Olivia Olivia", role: "Reviewer" },
];

export default function AssigneeMultiselectList() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<Assignees[]>([]);
  const [pendingValue, setPendingValue] = React.useState<Assignees[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Badge
        badgeContent={value.length}
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
          endIcon={<ExpandMoreIcon />}
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
            Assignee
          </Typography>
        </Button>
      </Badge>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div style={{ background: COLORS.GAMMA_BACKGROUND_WHITE }}>
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
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-5px",
                    }}
                  >
                    <Checkbox
                      icon={icon}
                      disableRipple
                      checkedIcon={checkedIcon}
                      checked={selected}
                      sx={{
                        "&.Mui-checked": {
                          color: COLORS.ALPHA_PRIMARY_PURPLE,
                        },
                      }}
                    />
                    <Grid container alignItems="center">
                      <Grid item>
                        <Avatar
                          src={option.img}
                          sx={{
                            bgcolor: COLORS.ALPHA_PRIMARY_PURPLE,
                            width: "28px",
                            height: "28px",
                            fontSize: "10px",
                          }}
                        >
                          {!option.img && stringAvatar(option.name)}
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontFamily: "Space Grotesk",
                            fontWeight: "500px",
                            lineHeight: "12px",
                            letterSpacing: "0.25px",
                            textAlign: "left",
                            color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                            marginLeft: "10px",
                          }}
                        >
                          {option.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontFamily: "Space Grotesk",
                            fontWeight: "500px",
                            lineHeight: "12px",
                            letterSpacing: "0.25px",
                            textAlign: "left",
                            color: COLORS.BETA_SECONDARY_GREY,
                            marginLeft: "10px",
                          }}
                        >
                          {option.role}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </li>
              )}
              options={[...assignees].sort((a, b) => {
                // Display the selected items first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + assignees.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + assignees.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  sx={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    fontWeight: "400",
                    background: COLORS.GAMMA_BACKGROUND_WHITE,
                    width: "235px",
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
          </div>
        </ClickAwayListener>
      </Popper>
    </React.Fragment>
  );
}
