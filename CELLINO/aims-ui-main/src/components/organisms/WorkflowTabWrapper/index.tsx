import WorkflowTab from "../../molecules/WorkflowTab";
import { WorkflowTabProps } from "../../../constants/types";
import { useOutletContext } from "react-router-dom";

function WorkflowTabWrapper() {
  const {
    workflowData,
    workflowError,
  }: {
    workflowData: WorkflowTabProps | undefined;
    workflowError?: boolean;
  } = useOutletContext();

  return (
    <WorkflowTab workflowData={workflowData} workflowError={workflowError} />
  );
}

export default WorkflowTabWrapper;
