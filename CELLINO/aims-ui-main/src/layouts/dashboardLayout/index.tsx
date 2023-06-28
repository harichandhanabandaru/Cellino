import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
}));

export default function DashboardLayout() {
  return (
    <RootStyle>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
