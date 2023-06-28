const MuiCssBaseline = {
  styleOverrides: {
    body: {
      "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        width: "10px",
        height: "8px",
      },
      "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
        backgroundColor: "#eae4f0",
        opacity: "40%",
        borderRadius: "69px",
      },
      "-webkit-touch-callout": "none",
      "	-webkit-user-select": "none",
      "-khtml-user-select": "none",
      "-moz-user-select": "none",
      "	-ms-user-select": "none",
      "user-select": "none",
    },
  },
};

export default MuiCssBaseline;
