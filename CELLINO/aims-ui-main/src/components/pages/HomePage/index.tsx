// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import React, { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "../Page";
import { loaderCountVar } from "../../../apollo/cache";

import { LeftNavPanel } from "../../organisms/LeftNavPanel/LeftNavPanel";
// import PlatesView from "../../organisms/PlatesView";
const PlatesView = lazy(() => import("../../organisms/PlatesView"));
// import RunsView from "../../organisms/RunsView";
const RunsView = lazy(() => import("../../organisms/RunsView"));
// import ReviewersView from "../../organisms/ReviewersView";
const ReviewersView = lazy(() => import("../../organisms/ReviewersView"));

interface IComponentOnRoute {
  path: string;
  label: string;
  Component: JSX.Element;
}

const HOME_COMPONENTS: IComponentOnRoute[] = [
  {
    path: "/plates",
    label: "Plates",
    Component: <PlatesView />,
  },
  {
    path: "/runs",
    label: "Runs",
    Component: <RunsView />,
  },
  {
    path: "/reviewers",
    label: "Reviewers",
    Component: <ReviewersView />,
  },
];

function HomePage() {
  useEffect(() => {
    return () => {
      loaderCountVar({ count: 0 });
    };
  }, []);

  return (
    <Page title={"Home"}>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridAutoFlow: "column",
          height: "100%",
        }}
      >
        <LeftNavPanel />
        <Routes>
          {HOME_COMPONENTS.map((componentOnRoute: IComponentOnRoute, index) => {
            return (
              <Route
                key={index}
                path={componentOnRoute.path}
                element={componentOnRoute.Component}
              />
            );
          })}
        </Routes>
      </div>
    </Page>
  );
}

export default HomePage;
