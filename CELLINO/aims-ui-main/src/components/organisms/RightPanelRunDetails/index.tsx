// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import React from "react";
import {
  useParams,
  Link,
  useLocation,
  matchPath,
  Outlet,
} from "react-router-dom";
import { Run, WorkflowTabProps } from "../../../constants/types";
import { Tab, Tabs } from "@mui/material";
import theme from "../../../theme";
import { COLORS } from "../../../theme/Colors";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const tabStyles = {
  textTransform: "None",
  ...theme.typography.body3,
};

const RightPanelRunDetails = ({
  runData,
  plates,
  runsError,
  workflowData,
  workflowError,
}: {
  runData: Run | undefined;
  plates: string[];
  runsError?: boolean;
  workflowData: WorkflowTabProps | undefined;
  workflowError?: boolean;
}) => {
  const { runId } = useParams();

  const routeMatch = useRouteMatch([
    "/run/:runId",
    "/run/:runId/workflow",
    "/run/:runId/protocols",
  ]);

  const currentTab = routeMatch?.pattern?.path;

  return (
    <div css={{ marginLeft: "31px" }}>
      <Tabs
        value={currentTab}
        sx={{ borderBottom: `1px solid ${COLORS.GAMMA_HEATMAP_100}` }}
      >
        <Tab
          label="Details"
          value="/run/:runId"
          to={`/run/${runId}`}
          component={Link}
          disableRipple
          sx={{ ...tabStyles }}
        />
        <Tab
          label="Workflow"
          value="/run/:runId/workflow"
          to={`/run/${runId}/workflow`}
          component={Link}
          disableRipple
          sx={{ ...tabStyles }}
        />
        <Tab
          label="Protocols"
          value="/run/:runId/protocols"
          to={`/run/${runId}/protocols`}
          component={Link}
          sx={{ ...tabStyles }}
          disableRipple
        />
      </Tabs>
      <Outlet
        context={{ runData, plates, runsError, workflowData, workflowError }}
      />
    </div>
  );
};

export default RightPanelRunDetails;
