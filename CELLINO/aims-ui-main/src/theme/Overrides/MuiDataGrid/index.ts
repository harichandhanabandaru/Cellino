import { COLORS } from "../../Colors";

const MuiDataGrid = {
  styleOverrides: {
    root: {
      border: 0,
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${COLORS.GAMMA_HEATMAP_200}`,
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
        {
          outline: "none",
        },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: "white",
      },
      backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
      "& .header-class": {
        backgroundColor: COLORS.GAMMA_BACKGROUND_02,
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: COLORS.GAMMA_BACKGROUND_01,
        border: 0,
      },
      "& .MuiDataGrid-columnSeparator": {
        visibility: "hidden",
      },
      "& .MuiDataGrid-columnHeaders": {
        border: 0,
      },
    },
  },
};

export default MuiDataGrid;
