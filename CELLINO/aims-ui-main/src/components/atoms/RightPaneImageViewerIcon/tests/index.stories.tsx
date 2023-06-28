import React from "react";
import Comments from "../../../../assets/Comments.png";
import RightPaneImageViewerIcon from "..";

export default {
  title: "Atoms/RightPaneImageViewerIcon",
  component: RightPaneImageViewerIcon,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A68812",
    },
  },
};

export const BackArrow = () => (
  <RightPaneImageViewerIcon src={Comments} alt="Comments" />
);
