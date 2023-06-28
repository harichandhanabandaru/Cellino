import React from "react";

interface IconProps {
  source: string;
  isSelectable?: boolean;
  isclicked?: boolean;
}

export function IconAIMS({ source, isSelectable, isclicked }: IconProps) {
  if (isSelectable === true && isclicked === true) {
    const image = require(`../../../assets/${source.replace(
      ".png",
      "-selected.png"
    )}`);
    return (
      <img
        data-testid={"Selected-Image"}
        src={image}
        alt={source.replace(".png", "-selected.png")}
      />
    );
  } else {
    const image = require(`../../../assets/${source}`);
    return <img data-testid={"Unselected-Image"} src={image} alt={source} />;
  }
}
