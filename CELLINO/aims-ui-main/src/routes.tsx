import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ROUTES } from "./constants";

const ProtocolTab = lazy(() => import("./components/organisms/ProtocolTab"));
const RunDetailsTabWrapper = lazy(
  () => import("./components/organisms/RunDetailsTabWrapper")
);
const WorkflowTabWrapper = lazy(
  () => import("./components/organisms/WorkflowTabWrapper")
);
const ImageViewerPage = lazy(
  () => import("./components/pages/ImageViewerPage")
);
const DashboardLayout = lazy(() => import("./layouts/dashboardLayout"));
const HomePage = lazy(() => import("./components/pages/HomePage"));
const PlateViewPage = lazy(() => import("./components/pages/PlateViewPage"));
const RunDetailPage = lazy(() => import("./components/pages/RunDetailPage"));
const HealthCheckPage = lazy(() => import("./components/pages/HealthCheck"));

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "*", element: <HomePage /> },
        { path: "", element: <Navigate to={ROUTES.PLATES} /> },
      ],
    },
    { path: ROUTES.IMAGE_VIEWER, element: <ImageViewerPage /> },
    { path: ROUTES.PLATE_VIEW, element: <PlateViewPage /> },
    {
      path: ROUTES.RUN_DETAILS,
      element: <RunDetailPage />,
      children: [
        { path: "", element: <RunDetailsTabWrapper /> },
        { path: "workflow", element: <WorkflowTabWrapper /> },
        { path: "protocols", element: <ProtocolTab /> },
      ],
    },
    { path: ROUTES.HEALTH_CHECK, element: <HealthCheckPage /> },
  ]);
}
