import { FormControl, InputBase, InputLabel, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { COLORS } from "../../../theme/Colors";

const CustomInput = styled(InputBase)(({ theme, error }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 6,
    position: "relative",
    backgroundColor: COLORS.GAMMA_BACKGROUND_02,
    fontSize: 12,
    width: "auto",
    padding: "10px 12px",
    fontWeight: 400,
    border: error ? `1px solid ${COLORS.BETA_SECONDARY_ACCENT_RED}` : "0px",
  },
  "& .MuiInputBase-input:focus": {
    border: error
      ? `1px solid ${COLORS.BETA_SECONDARY_ACCENT_RED}`
      : "1px solid #8900FF",
  },
}));

function CustomInputField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (arg: string) => void;
  required?: boolean;
}) {
  return (
    <FormControl variant="standard">
      <div>
        <InputLabel shrink>
          <Typography
            variant={"overline"}
            textTransform={"none"}
            fontSize="16px"
          >
            {label}
            {required ? "*" : ""}
          </Typography>
        </InputLabel>
        <CustomInput
          onChange={(event) => onChange(event.target.value)}
          value={value}
          error={(value.length > 0 ? false : true) && required === true}
        />
        {required &&
          (Boolean(value.length) || (
            <Typography
              variant="overline"
              color={COLORS.BETA_SECONDARY_ACCENT_RED}
              sx={{ textTransform: "none" }}
            >
              Name cannot be empty
            </Typography>
          ))}
      </div>
    </FormControl>
  );
}

export default CustomInputField;
