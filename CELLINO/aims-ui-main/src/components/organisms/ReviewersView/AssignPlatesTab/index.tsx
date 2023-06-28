// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import { Box } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridEnrichedColDef } from "@mui/x-data-grid";
import { RenderReviewer } from "./renderer/RenderReviewer";
import { RenderPlateDetails } from "./renderer/RenderPlateDetails";
import { RenderAssign } from "./renderer/RenderAssign";
import {
  usePlateReviewersLazyQuery,
  useUnassignedPlatesLazyQuery,
  useUnassignReviewerToPlatesMutation,
} from "../../../../generated/graphql";
import { loaderCountVar } from "../../../../apollo/cache";
import { COLORS } from "../../../../theme/Colors";
import CustomDiscardModal from "../../../molecules/CustomDiscardModal";
import EmptyAndErrorState from "../../../molecules/EmptyAndErrorState";
import ReviewerError from "../../../../assets/ReviewerError.svg";

import {
  generateAssignPlateData,
  generateReviewerData,
  getPlateNameById,
  getReviewerNameById,
  nameFilterOperators,
  SkeletonLoadingState,
} from "./util";

const ERROR_HEADING = "Error loading details";
const ERROR_MESSAGE =
  "We were unable to fetch details. Please refresh the page and try again";

const CONFIRM_DELETE_MESSAGE =
  "Are you sure you want to unassign this plate? If you choose to unassign this plate, any unsaved work will be lost.";

export interface PlateData {
  id?: string | null;
  name?: string | null;
  runId?: string | null;
  runName?: string | null;
}

export interface AssignPlateData {
  runId: string;
  runName: string;
  checked: boolean;
  plates: {
    id: string;
    name: string;
    checked: boolean;
  }[];
}

export interface ReviewerData {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  plateCount?: number;
  plates?: (PlateData | null)[] | null;
  unassignedplates?: (PlateData | null)[] | null;
}

const emptyDataArray: ReviewerData[] = [];
const emptyassignPlateDataArray: AssignPlateData[] = [];

// Pagination sizes available to change.
const PAGINATION_OPTIONS = [5, 10, 25];
const DEFAULT_SIZE = PAGINATION_OPTIONS[0];

const DEFAULT_PLATE_SIZE = 10;

const SortedAscendingIcon = () => <ExpandLessIcon className="icon" />;
const SortedDescendingIcon = () => <ExpandMoreIcon className="icon" />;

const ReviewersAssignPlatesTab = () => {
  // States for the component.
  const [openPopUp, setOpenPopUp] = React.useState(false);

  // These states are used to remove a plate from a user.
  const [selectedPlateId, setSelectedPlateId] = React.useState<string>();
  const [selectedUserId, setSelectedUserId] = React.useState<string>();

  const [data, setData] = React.useState<ReviewerData[]>(emptyDataArray);
  const [assignPlateData, setAssignPlateData] = React.useState<
    AssignPlateData[]
  >(emptyassignPlateDataArray);

  const [reviewerPage, setReviewerPage] = React.useState<number>(0);
  const [reviewerSize, setReviewerSize] = React.useState<number>(DEFAULT_SIZE);
  const [reviewerTotalElements, setReviewerTotalElements] =
    React.useState<number>(0);

  const [unassignedPlatesPage, setUnassignedPlatesPage] =
    React.useState<number>(1);

  // Mutations
  // This will unassign reviewer.
  const [unassignReviewer] = useUnassignReviewerToPlatesMutation();

  // Perform update operation.
  // This should unassign a reviewer to the plate.
  const handleContinue = () => {
    if (selectedUserId && selectedPlateId) {
      unassignReviewer({
        variables: {
          plateId: selectedPlateId,
          userId: selectedUserId,
        },
      }).then(() => {
        refetch();
      });
    }
    setOpenPopUp(false);
  };

  // This should cancel the pop up.
  const handleCancel = () => {
    setSelectedPlateId("");
    setSelectedUserId("");
    setOpenPopUp(false);
  };

  // Queries
  const [
    getPlateReviewersData,
    {
      data: plateReviewers,
      loading: plateReviewerLoading,
      error: plateReviewerError,
      refetch: plateReviewerRefetch,
    },
  ] = usePlateReviewersLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const [
    getUnassignedPlatesData,
    {
      data: unassignedPlatesData,
      loading: unassignedPlatesLoading,
      error: unassignedPlatesError,
      refetch: unassignedPlatesRefetch,
      fetchMore: fetchMoreUnassignedPlates,
    },
  ] = useUnassignedPlatesLazyQuery({
    variables: {
      reviewerIds: "",
      size: DEFAULT_PLATE_SIZE,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const loadMoreUnassignedPlates = React.useCallback(() => {
    if (!unassignedPlatesLoading) {
      fetchMoreUnassignedPlates({
        variables: {
          page: unassignedPlatesPage + 1,
        },
      });
      setUnassignedPlatesPage(unassignedPlatesPage + 1);
    }
  }, [
    fetchMoreUnassignedPlates,
    unassignedPlatesLoading,
    unassignedPlatesPage,
  ]);

  // UseEffects
  React.useEffect(() => {
    if (getUnassignedPlatesData) {
      getUnassignedPlatesData({
        variables: {
          page: unassignedPlatesPage,
        },
      });
    }
  }, [getUnassignedPlatesData, unassignedPlatesPage]);

  React.useEffect(() => {
    if (getPlateReviewersData) {
      getPlateReviewersData({
        variables: {
          page: reviewerPage + 1, // Need 1-indexed data in API but 0-indexed in UI for Datagrid
          size: reviewerSize,
        },
      });
    }
  }, [getPlateReviewersData, reviewerPage, reviewerSize]);

  // Fetching plate reviewers and then
  // 1. generate the reviewer data
  // 2. assigning totalElements for the pagination in the table.
  React.useEffect(() => {
    const reviewers = plateReviewers?.plateReviewers?.content;
    const totalElements =
      plateReviewers?.plateReviewers?.pageInfo?.totalElements;
    if (reviewers) {
      setData(generateReviewerData(reviewers));
      setReviewerTotalElements((prevState) =>
        totalElements ? totalElements : prevState
      );
    }
  }, [plateReviewers]);

  React.useEffect(() => {
    if (unassignedPlatesData) {
      // Using previous state to generate the new list. The old data is used here because we need information related to
      // a plate checked state.
      setAssignPlateData((oldData) => {
        // Once new data is fetched, we are spreading the elements to create a new instance which lets the react understand the state is changed.
        return [
          ...generateAssignPlateData(
            unassignedPlatesData.plates.content.map((ele) => {
              return {
                id: ele?.id,
                name: ele?.name,
                runId: ele?.run?.id,
                runName: ele?.run?.name,
              };
            }),
            oldData
          ),
        ];
      });
    }
  }, [unassignedPlatesData]);

  // This will set the loading state and shows the loading state.
  React.useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  React.useEffect(() => {
    const count = loaderCountVar().count;
    if (!plateReviewerLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (plateReviewerLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [plateReviewerLoading]);

  React.useEffect(() => {
    const count = loaderCountVar().count;
    if (!unassignedPlatesLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (unassignedPlatesLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [unassignedPlatesLoading]);

  // Callback to perform refetching of all data.
  const refetch = React.useCallback(() => {
    setAssignPlateData([]); // To remove the old data which are checked
    unassignedPlatesRefetch();
    plateReviewerRefetch({ page: reviewerPage, size: reviewerSize });
  }, [
    plateReviewerRefetch,
    unassignedPlatesRefetch,
    reviewerPage,
    reviewerSize,
  ]);

  // Columns. Did not put it outside the component as it has dependent setState variables.
  const columns: GridEnrichedColDef<ReviewerData>[] = [
    {
      field: "name",
      sortable: true,
      headerName: "Reviewer",
      flex: 0.2,
      headerClassName: "header-class",
      renderCell: RenderReviewer,
      filterable: true,
      filterOperators: nameFilterOperators(),
      hideable: false,
    },
    {
      field: "plateCount",
      headerName: "Plates",
      flex: 0.1,
      headerClassName: "header-class",
      sortable: true,
      headerAlign: "right",
      align: "right",
      disableColumnMenu: true,
      type: "number",
    },
    {
      field: "plates",
      headerName: "Plate details",
      sortable: false,
      flex: 0.4,
      headerClassName: "header-class",
      renderCell: (params) => {
        return RenderPlateDetails(
          params,
          setOpenPopUp,
          setSelectedPlateId,
          setSelectedUserId
        );
      },
      disableColumnMenu: true,
      filterable: false,
    },
    {
      field: "assign",
      headerName: "Assign",
      sortable: false,
      flex: 0.2,
      headerClassName: "header-class",
      renderCell: RenderAssign(
        assignPlateData,
        refetch,
        loadMoreUnassignedPlates,
        unassignedPlatesData?.plates?.pageInfo?.totalElements || 0
      ),
      disableColumnMenu: true,
      filterable: false,
    },
  ];

  return (
    <div style={{ height: "70vh" }}>
      {plateReviewerError && unassignedPlatesError && (
        <div css={{ height: "100%", alignItems: "center" }}>
          <EmptyAndErrorState
            image={ReviewerError}
            heading={ERROR_HEADING}
            subText={ERROR_MESSAGE}
          />
        </div>
      )}
      {!(plateReviewerError || unassignedPlatesError) && (
        <Box sx={{ height: "100%" }}>
          <DataGrid
            columns={columns}
            rows={data}
            rowsPerPageOptions={PAGINATION_OPTIONS}
            pagination
            paginationMode="server"
            page={reviewerPage}
            pageSize={reviewerSize}
            rowCount={reviewerTotalElements}
            getRowHeight={() => "auto"}
            disableColumnSelector
            disableSelectionOnClick
            // sx={DataGridStyles}
            onPageChange={(page, _details) => {
              setReviewerPage(page);
            }}
            onPageSizeChange={(pagesize, _details) => {
              setReviewerSize(pagesize);
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: "plateCount", sort: "desc" }],
              },
            }}
            components={{
              ColumnSortedAscendingIcon: SortedAscendingIcon,
              ColumnSortedDescendingIcon: SortedDescendingIcon,
              NoRowsOverlay: SkeletonLoadingState,
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
          />
          {/* Show popup once the user tries to unassign the table. This will happen when the user presses the "x" icon on a plate for a given user. */}
          {openPopUp && (
            <CustomDiscardModal
              open={openPopUp}
              handleCancel={handleCancel}
              handleContinue={handleContinue}
              heading={`Unassign plate ${getPlateNameById(
                data,
                selectedUserId || "",
                selectedPlateId || ""
              )} from ${getReviewerNameById(data, selectedUserId || "")}`}
              subText={CONFIRM_DELETE_MESSAGE}
              cancelButtonText={"Cancel"}
              continueButtonText={"Unassign"}
            />
          )}
        </Box>
      )}
    </div>
  );
};

export default ReviewersAssignPlatesTab;
