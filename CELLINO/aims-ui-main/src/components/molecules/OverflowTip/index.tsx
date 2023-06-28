import { useEffect, useRef, useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import { TypographyVariant } from "../../../constants/types";

function OverflowTip({
  text,
  variant = "body3",
}: {
  text: string;
  variant?: TypographyVariant;
}) {
  const textElementRef = useRef<HTMLElement>(null);

  const compareSize = () => {
    /* istanbul ignore next */
    const compare =
      (textElementRef.current?.scrollWidth ?? 0) >
      (textElementRef.current?.clientWidth ?? 0);
    setHover(compare);
  };

  // when text prop changes
  useEffect(() => {
    compareSize();
  }, [text]);

  // resize listener
  useEffect(() => {
    window.addEventListener("resize", compareSize);
    return () => {
      window.removeEventListener("resize", compareSize);
    };
  }, []);

  // Define state and function to update the value
  const [hoverStatus, setHover] = useState(false);

  return (
    <Tooltip title={text} disableHoverListener={!hoverStatus} arrow>
      <Typography ref={textElementRef} noWrap variant={variant}>
        {text}
      </Typography>
    </Tooltip>
  );
}

export default OverflowTip;
