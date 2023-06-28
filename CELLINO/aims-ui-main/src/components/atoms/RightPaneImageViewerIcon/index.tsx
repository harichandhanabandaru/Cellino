import React from "react";

interface propsType {
  src: string;
  alt: string;
}

function RightPaneImageViewerIcon(props: propsType) {
  return (
    <img
      data-testid={"RightPaneImageViewerIcon"}
      alt={props.alt}
      src={props.src}
    />
  );
}

export default RightPaneImageViewerIcon;
