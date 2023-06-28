// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import { Interpolation } from "@emotion/react";

function ImageWrapper({
  src,
  cssStyles,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  cssStyles: Interpolation<any>;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <img
      src={src}
      alt={alt}
      css={cssStyles}
      onClick={onClick}
      loading={"lazy"}
    />
  );
}

export default ImageWrapper;
