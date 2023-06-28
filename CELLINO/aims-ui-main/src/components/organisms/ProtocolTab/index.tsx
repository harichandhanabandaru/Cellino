// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import { COLORS } from "../../../theme/Colors";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoSvg from "../../../assets/info.svg";
import memoize from "memoize-one";
import { rows } from "./mockData";
import ProtocolRightPanel from "../../molecules/ProtocolRightPanel";
import OverflowTip from "../../molecules/OverflowTip";

interface ProtocolRow {
  id: string;
  phase: string;
  type: string;
  definitionId: string;
  settingsData: string;
}

const SortedDescendingIcon = () => <ExpandMoreIcon className="icon" />;
const SortedAscendingIcon = () => <ExpandLessIcon className="icon" />;

const dataGridStyle = {
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
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: COLORS.GAMMA_BACKGROUND_02,
  },
  "& .selected-row": {
    border: `1px solid ${COLORS.ALPHA_PRIMARY_PURPLE}`,
    width: "calc(100% - 10px)",
    // borderBottom: `1px solid ${COLORS.ALPHA_PRIMARY_PURPLE}`,
  },
};

//Render the status icon
const RenderStatusIcon = (
  props: GridRenderCellParams,
  handleRightPanelOpen: (rowId: string) => void,
  hoveredRow: string,
  selectedRow: string
) => {
  const { row } = props;
  const isDisplayIcon = selectedRow === row?.id || hoveredRow === row?.id;
  return (
    <div onClick={() => handleRightPanelOpen(row?.id)} data-testid="icon">
      <img
        src={InfoSvg}
        alt="info"
        style={{
          cursor: "pointer",
          display: isDisplayIcon ? "block" : "none",
        }}
      />
    </div>
  );
};

const RenderCell = (props: GridRenderCellParams) => {
  const { value } = props;
  return <OverflowTip text={value} variant={"body4"} />;
};

//get the settings data associated with the row to display in the right panel
const getRequiredSettingData = memoize((rows, selectedRowId) => {
  const rowSettingData = rows.filter(
    (row: ProtocolRow) => row.id === selectedRowId
  );
  return rowSettingData[0]?.settingsData;
});

const ProtocolTab = () => {
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [isRightPanelOpen, setIsRightPanelOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [hoveredRow, setHoveredRow] = useState<string>("");

  const handleRightPanelOpen = (rowId: string) => {
    setIsRightPanelOpen(true);
    //here the selected row id should be combination of phase id and protocol id will implement in integration
    setSelectedRow(rowId);
  };

  const handleRightPanelClose = () => {
    setIsRightPanelOpen(false);
    setSelectedRow("");
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    setHoveredRow(event.currentTarget.getAttribute("data-id") ?? "");
  };

  const handleMouseLeave = () => {
    setHoveredRow("");
  };

  const columns: GridColDef[] = [
    {
      field: "runStatus",
      width: 58,
      headerName: "⠀", //U+2800,HTML Entity : &#10240;
      hideSortIcons: true,
      disableColumnMenu: true,
      headerClassName: "headear-class",
      renderCell: (params) => {
        return RenderStatusIcon(
          params,
          handleRightPanelOpen,
          hoveredRow,
          selectedRow
        );
      },
      filterable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phase",
      minWidth: 200,
      headerName: "Phase",
      headerClassName: "header-class",
      flex: 1,
      renderCell: RenderCell,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 220,
      headerClassName: "header-class",
      flex: 1,
      renderCell: RenderCell,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 180,
      headerClassName: "header-class",
      flex: 1,
      renderCell: RenderCell,
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 200,
      headerClassName: "header-class",
      flex: 1,
      renderCell: RenderCell,
    },
    {
      field: "definitionId",
      headerName: "Definition ID",
      minWidth: 200,
      headerClassName: "header-class",
      flex: 1,
      renderCell: RenderCell,
    },
  ];

  return (
    <div
      css={{
        height: "650px",
        "& .header-class": {
          backgroundColor: COLORS.GAMMA_BACKGROUND_02,
        },
        "& .MuiDataGrid-root, & .MuiDataGrid-columnHeaders": {
          border: "none",
          backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
        },
        paddingRight: "25px",
        marginTop: "31px",
        position: "relative",
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        components={{
          ColumnSortedDescendingIcon: SortedDescendingIcon,
          ColumnSortedAscendingIcon: SortedAscendingIcon,
        }}
        componentsProps={{
          row: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          },
          basePopper: {
            sx: {
              /* stylings applied to the column menu*/
              "&.MuiDataGrid-menu .MuiPaper-root": {
                borderRadius: "8px",
                boxShadow: "0px 4px 24px 0px #0000001A",
                color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
              },
              "&.MuiDataGrid-menu .MuiMenuItem-root": {
                fontSize: "16px",
              },
            },
          },
        }}
        sx={{ ...dataGridStyle }}
        disableColumnSelector
        rowsPerPageOptions={[10, 25, 50]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableSelectionOnClick
        getRowClassName={(params) => {
          return params.id === selectedRow ? `selected-row` : "";
        }}
      />
      {isRightPanelOpen && (
        <div
          css={{ position: "absolute", top: 0, right: 25 }}
          data-testid="right-panel"
        >
          <ProtocolRightPanel
            settingsData={getRequiredSettingData(rows, selectedRow)}
            handleClose={handleRightPanelClose}
          />
        </div>
      )}
    </div>
  );
};

export default ProtocolTab;
