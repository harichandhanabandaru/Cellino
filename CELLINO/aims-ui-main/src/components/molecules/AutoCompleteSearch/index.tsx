import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";
import { COLORS } from "../../../theme/Colors";
import SearchIconImage from "../../../assets/SearchIconImage.png";

function AutoCompleteSearch() {
  return (
    <Autocomplete
      data-testid={"autoComplete"}
      options={data}
      sx={{
        width: 338,
        height: 54,
        backgroundColor: COLORS.GAMMA_BACKGROUND_01,
        borderRadius: 15,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          sx={{
            marginTop: "10px",
            marginLeft: "20px",
            fontWeight: 400,
            fontSize: 16,
          }}
          type="text"
          placeholder="Search"
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <img alt="img" src={SearchIconImage} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearch;

interface DataType {
  //   data propsType
}

const data: readonly DataType[] = [
  // data to use
];
