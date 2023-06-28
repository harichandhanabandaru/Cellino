import { PlateReviewer } from "../../../../constants/types";
import { formatName } from "../../../../utils/formatName";
import { AssignPlateData, PlateData, ReviewerData } from ".";
import { Skeleton, Typography } from "@mui/material";
import { COLORS } from "../../../../theme/Colors";
import SearchSvg from "../../../../assets/searchIcon.svg";
import { getGridStringOperators } from "@mui/x-data-grid";

export const generateReviewerData = (data: PlateReviewer[]): ReviewerData[] => {
  const rData: ReviewerData[] = [];

  data.forEach((reviewer) => {
    rData.push({
      id: reviewer?.user?.id,
      name: formatName(reviewer?.user?.firstName, reviewer?.user?.lastName),
      email: reviewer?.user?.email,
      plateCount: reviewer?.plate?.length,
      plates: reviewer?.plate,
    });
  });

  return rData;
};

export const generateAssignPlateData = (
  data: PlateData[],
  oldData: AssignPlateData[]
): AssignPlateData[] => {
  const pData: AssignPlateData[] = oldData;

  if (data) {
    data.forEach((ele) => {
      let runData = pData.filter((run) => run.runId === ele.runId);

      if (ele.id && ele.runId) {
        if (runData.length !== 0) {
          let plateData = runData[0].plates.filter(
            (plate) => plate.id === ele.id
          );
          if (plateData.length === 0) {
            runData[0].plates?.push({
              id: ele?.id,
              name: ele?.name || "-",
              checked: false,
            });
          }
        } else {
          pData.push({
            runId: ele.runId,
            runName: ele?.runName || "-",
            checked: false,
            plates: [
              {
                id: ele.id,
                name: ele.name || "-",
                checked: false,
              },
            ],
          });
        }
      }
    });
  }
  return pData;
};

export const getPlateNameById = (
  data: ReviewerData[],
  reviewerId: string,
  plateId: string
): string | null | undefined => {
  return data
    .filter((reviewer) => reviewer.id === reviewerId)[0]
    .plates?.filter((plate) => plate && plate.id === plateId)[0]?.name;
};

export const getReviewerNameById = (
  data: ReviewerData[],
  reviewerId: string
): string | null | undefined => {
  return data.filter((reviewer) => reviewer.id === reviewerId)[0].name;
};

export const SkeletonLoadingState = (loading: boolean) => {
  return loading ? (
    <Skeleton variant="rectangular" height="100%" width={"100%"} />
  ) : (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        justifyItems: "center",
        marginTop: "2%",
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

export const nameFilterOperators = () => {
  const filterOps = getGridStringOperators().filter(
    (op) => op.value === "contains"
  );
  if (filterOps && filterOps.length > 0) {
    filterOps[0].getApplyFilterFn = (item) => {
      if (!item || !item.value) return null;
      return (params) => {
        return (
          params.row.name.includes(item.value) ||
          params.row.email.includes(item.value)
        );
      };
    };
  }
  return filterOps;
};
