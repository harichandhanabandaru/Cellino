// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { LeftNavPanel } from "../../organisms/LeftNavPanel/LeftNavPanel";
import Page from "../Page";
import TopBarKanbanView from "../../organisms/TopBarKanbanView";
import { loaderCountVar } from "../../../apollo/cache";
import ReviewersView from "../../organisms/ReviewersView";
import { COLORS } from "../../../theme/Colors";

const ReviewersListPage = () => {
  useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  return (
    <Page title={"Reviewers"}>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridAutoFlow: "column",
          height: "100%",
          backgroundColor: COLORS.GAMMA_BACKGROUND_01,
        }}
      >
        <LeftNavPanel />
        <div
          css={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gridAutoFlow: "row",
          }}
        >
          <TopBarKanbanView label="Reviewers" />
          <ReviewersView />
        </div>
      </div>
    </Page>
  );
};

export default ReviewersListPage;
