// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import {
  useRunsLazyQuery,
  useRunStatusCountLazyQuery,
} from "../../../generated/graphql";
import RunsTableLegend from "../../molecules/RunsTableLegend";
import RunTile from "../../molecules/RunTile";
import {
  DataGrid,
  getGridStringOperators,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { COLORS } from "../../../theme/Colors";
import { styled } from "@mui/material/styles";
import { loaderCountVar } from "../../../apollo/cache";
import { getRunStatusIcon } from "../../molecules/RunAccordionDetails";
import { Typography, Link, Skeleton } from "@mui/material";
import TopBarKanbanView from "../TopBarKanbanView";
import memoize from "memoize-one";
import EmptyAndErrorState from "../../molecules/EmptyAndErrorState";
import ErrorSvg from "../../../assets/error.svg";
import SearchSvg from "../../../assets/searchIcon.svg";
import { formatName } from "../../../utils/formatName";
import { ROUTES } from "../../../constants";

export interface RunsListProps {
  id: string;
  runStatus: string;
  runName: { name: string; id: string };
  workflowType: string;
  startDate: string;
  plates: string;
  wells: string;
  activePlates: string;
  activeWells: string;
  originalPlates: string;
  originalWells: string;
  runDay: string;
  cloneReviewer: string;
}

const RenderStatusIcon = (props: GridRenderCellParams) => {
  const { value } = props;
  return <img src={getRunStatusIcon(value)} alt="status-icon" />;
};

const RenderRunName = (props: GridRenderCellParams) => {
  const { value, row } = props;
  return (
    <Link
      href={`${ROUTES.RUN}/${row?.id}`}
      sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS }}
    >
      <Typography variant="body2" color={COLORS.BETA_TEXT_HIGH_EMPHASIS}>
        {value}
      </Typography>
    </Link>
  );
};
const containOnlyFilter = getGridStringOperators().filter(
  (op) => op.value === "contains"
);
const columns: GridColDef[] = [
  {
    field: "runStatus",
    minWidth: 35,
    headerName: "⠀", //U+2800,HTML Entity : &#10240;
    hideSortIcons: true,
    disableColumnMenu: true,
    headerClassName: "headear-class",
    flex: 1,
    renderCell: RenderStatusIcon,
    filterable: false,
  },
  {
    field: "runName",
    headerName: "Run name",
    minWidth: 200,
    headerClassName: "header-class",
    flex: 1,
    renderCell: RenderRunName,
    filterOperators: containOnlyFilter,
  },
  {
    field: "workflowType",
    headerName: "Workflow type",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    filterOperators: containOnlyFilter,
  },
  {
    field: "startDate",
    headerName: "Start date",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "date",
  },
  {
    field: "plates",
    headerName: "# Plates",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "wells",
    headerName: "# Wells",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "activePlates",
    headerName: "Active plates",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "activeWells",
    headerName: "Active wells",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "originalPlates",
    headerName: "Original plates",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "originalWells",
    headerName: "Original wells",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "runDay",
    headerName: "Run day",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    headerAlign: "right",
    align: "right",
    type: "number",
  },
  {
    field: "cloneReviewer",
    headerName: "Reviewer",
    minWidth: 150,
    headerClassName: "header-class",
    flex: 1,
    filterOperators: containOnlyFilter,
  },
];

export const getRunReviewers = (runReviewers: any) => {
  let reviewers: string[] = [];
  runReviewers &&
    runReviewers?.map((ele: { firstName: string; lastName: string }) =>
      reviewers.push(formatName(ele.firstName, ele.lastName))
    );
  let reviewersDisplay = "-";
  if (reviewers) {
    if (reviewers.length === 1) {
      reviewersDisplay = reviewers[0];
    } else if (reviewers.length > 1) {
      reviewersDisplay = reviewers.length + "";
    }
  }
  return reviewersDisplay;
};

const getRequiredRows = memoize((runsData) => {
  const requiredRunRows: any = [];
  runsData.forEach((run: any) => {
    let currentRun: RunsListProps = {
      id: run?.id ?? "-",
      runStatus: run?.status ?? "-",
      runName: run?.name ?? "-",
      workflowType: run?.workflow?.type ?? "-",
      startDate: getStartDay(run?.seedingDay),
      plates: run?.runMetric?.platesCount ?? "-",
      wells: run?.runMetric?.wellsCount ?? "-",
      activePlates: run?.runMetric?.activePlatesCount ?? "-",
      activeWells: run?.runMetric?.activeWellsCount ?? "-",
      originalPlates: run?.runMetric?.originalPlateCount ?? "-",
      originalWells: run?.runMetric?.originalWellCount ?? "-",
      runDay: run?.runDay ?? "-",
      cloneReviewer: getRunReviewers(run?.runReviewer),
    };
    requiredRunRows.push(currentRun);
  });
  return requiredRunRows;
});

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

const getStartDay = (seedingDay: string) => {
  if (seedingDay) {
    const date = new Date(seedingDay);
    const result = date.toLocaleDateString();
    return result;
  }
  return "-";
};

export const getSelectedRunStatus = (status: string) => {
  if (status === "In progress") {
    return "INPROGRESS";
  } else if (status === "Completed") {
    return "FINISHED";
  } else if (status === "Aborted") {
    return "ABORTED";
  }
  return "";
};

const getNoRowsText = (loading: boolean) => {
  return loading ? (
    <Skeleton variant="rectangular" height="54vh" width={"100%"} />
  ) : (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        justifyItems: "center",
        marginTop: "2%",
        maxHeight: "54vh",
        gap: 6,
        overflow: "scroll",
      }}
    >
      <img src={SearchSvg} alt="search" />
      <Typography variant="body3" color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}>
        No results found
      </Typography>
      <Typography variant="body4" color={COLORS.BETA_TEXT_LOW_EMPHASIS}>
        Try adjusting your search or filter to find what you're looking for
      </Typography>
    </div>
  );
};

export default function RunsView() {
  const [getRunsStatus, { data: runStatusCountData, loading }] =
    useRunStatusCountLazyQuery();

  const [pageSize, setPageSize] = React.useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [selectedRunStatus, setSelectedRunStatus] = useState<any>("");
  const [getRunsData, { data: runsData, loading: runsLoading, error }] =
    useRunsLazyQuery({ fetchPolicy: "cache-and-network" });
  const [rowCountState, setRowCountState] = React.useState(
    runsData?.runs?.pageInfo?.totalElements || 0
  );

  useEffect(() => {
    getRunsStatus();
  }, [getRunsStatus]);

  useEffect(() => {
    if (selectedRunStatus) {
      getRunsData({
        variables: {
          page: page + 1,
          size: pageSize,
          status: selectedRunStatus,
        },
      });
    } else {
      getRunsData({
        variables: {
          page: page + 1,
          size: pageSize,
        },
      });
    }
  }, [getRunsData, page, pageSize, selectedRunStatus]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!runsLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (runsLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [runsLoading]);

  useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  const runRows = runsData && getRequiredRows(runsData.runs.content);
  const totalElements = runsData?.runs?.pageInfo?.totalElements;

  useEffect(() => {
    setPage(0);
  }, [selectedRunStatus]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!loading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (loading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [loading]);

  React.useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      totalElements !== undefined ? totalElements : prevRowCountState
    );
  }, [totalElements]);

  const handleSelectedRunStatus = (status: string) => {
    setSelectedRunStatus(status);
  };

  return (
    <div
      css={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridAutoFlow: "row",
      }}
    >
      <TopBarKanbanView label="Runs" />
      <div
        css={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateRows: "auto auto 1fr",
          padding: "31px",
          paddingLeft: "45px",
          overflow: "scroll",
          backgroundColor: COLORS.GAMMA_BACKGROUND_01,
        }}
      >
        <div
          css={{
            display: "grid",
            gridAutoFlow: "column",
            justifyContent: "space-between",
            gap: 4,
            width: "100%",
          }}
        >
          {runStatusCountData &&
            runStatusCountData.runStatusCount.map(
              (item: any, index: number) => {
                return (
                  <>
                    <RunTile
                      value={item?.count}
                      label={item?.runStatus}
                      key={index}
                      status={getSelectedRunStatus(item.runStatus)}
                      selectedRunStatus={selectedRunStatus}
                      handleSelectedRunStatus={handleSelectedRunStatus}
                    />
                    {index !==
                      runStatusCountData?.runStatusCount.length - 1 && (
                      <Typography
                        variant="body4"
                        color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
                        sx={{ alignSelf: "center" }}
                      >
                        {index === 0 ? "=" : "+"}
                      </Typography>
                    )}
                  </>
                );
              }
            )}
        </div>
        <div css={{ display: "grid", justifyItems: "end", marginTop: 44 }}>
          <RunsTableLegend />
        </div>
        {error ? (
          <EmptyAndErrorState
            image={ErrorSvg}
            heading="Error loading runs"
            subText="We were unable to fetch runs. Please refresh the page and try again"
          />
        ) : (
          <div
            css={{
              marginTop: 6,
            }}
          >
            <StyledDataGrid
              components={{
                LoadingOverlay: LinearProgress,
                ColumnSortedDescendingIcon: SortedDescendingIcon,
                ColumnSortedAscendingIcon: SortedAscendingIcon,
                NoRowsOverlay: () => getNoRowsText(runsLoading),
                NoResultsOverlay: () => getNoRowsText(runsLoading),
              }}
              componentsProps={{
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
              rows={runRows ?? []}
              columns={columns}
              rowCount={rowCountState}
              disableColumnSelector
              sx={{
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                },
              }}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              pagination
              disableSelectionOnClick
              paginationMode="server"
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
