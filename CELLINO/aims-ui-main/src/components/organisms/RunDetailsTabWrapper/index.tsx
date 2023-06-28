import RunTabs from "../RunTabs";
import { Run } from "../../../constants/types";
import { useOutletContext } from "react-router-dom";

function RunDetailsTabWrapper() {
  const {
    runData,
    plates,
    runsError,
  }: {
    runData: Run | undefined;
    plates: string[];
    runsError?: boolean;
  } = useOutletContext();

  return <RunTabs runData={runData} plates={plates} runsError={runsError} />;
}

export default RunDetailsTabWrapper;
