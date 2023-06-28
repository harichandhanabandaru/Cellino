import LinearProgressBar from "../../atoms/LinearProgressBar";
import { useReactiveVar } from "@apollo/client";
import { loaderCountVar } from "../../../apollo/cache";

function LinearProgressBarController() {
  const loaderCount = useReactiveVar(loaderCountVar);
  return <LinearProgressBar loading={loaderCount.count > 0} />;
}

export default LinearProgressBarController;
