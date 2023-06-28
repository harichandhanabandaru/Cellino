// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import React from "react";
import Tabs from "../Tabs";
import TopBarKanbanView from "../TopBarKanbanView";
import ReviewersAssignPlatesTab from "./AssignPlatesTab";
const ReviewersView = () => {
  const reviewersTabs = [
    {
      label: "Assign plates",
      tabpanel: <ReviewersAssignPlatesTab />,
    },
  ];
  return (
    <div>
      <TopBarKanbanView label="Reviewers" />
      <div
        css={{
          marginLeft: "32px",
          marginTop: "31px",
          marginRight: "32px",
          height: "90%",
        }}
      >
        <Tabs tabs={reviewersTabs} />
      </div>
    </div>
  );
};

export default ReviewersView;
