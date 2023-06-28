import { GridRenderCellParams } from "@mui/x-data-grid";
import AssignPlates from "../../../AssignPlates";
import { AssignPlateData } from "..";

export const RenderAssign =
  (
    data: AssignPlateData[],
    refetch: () => void,
    loadMoreItems: () => void,
    totalElements: number
  ) =>
  (props: GridRenderCellParams) => {
    return (
      <AssignPlates
        items={data}
        userId={props.row.id}
        refetch={refetch}
        loadMoreItems={loadMoreItems}
        totalElements={totalElements}
      />
    );
  };
