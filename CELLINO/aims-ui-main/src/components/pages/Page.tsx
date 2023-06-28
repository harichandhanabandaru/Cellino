import { Helmet } from "react-helmet-async";
import { forwardRef, ReactNode } from "react";
import { Box } from "@mui/material";

const Page = forwardRef(
  (
    {
      children,
      title = "",
      meta,
      ...other
    }: { children: any; title: string; meta?: ReactNode },
    ref
  ) => (
    <>
      <Helmet>
        <title>{`AIMS | ${title}`}</title>
        {meta}
      </Helmet>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
        }}
        ref={ref}
        {...other}
      >
        {children}
      </Box>
    </>
  )
);

export default Page;
