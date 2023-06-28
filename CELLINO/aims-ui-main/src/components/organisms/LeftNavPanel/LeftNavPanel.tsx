// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { COLORS } from "../../../theme/Colors";
import { Avatar, Paper, Tooltip } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import cellino_small from "../../../assets/cellino-small.png";
import cellino_name from "../../../assets/small.png";
import { ReactComponent as runs } from "../../../assets/runs-selected.svg";
import { ReactComponent as plates } from "../../../assets/layout-selected.svg";
// import { ReactComponent as reports } from "../../../assets/reports-selected.svg";
// import { ReactComponent as metrics } from "../../../assets/metrics-selected.svg";
// import { ReactComponent as cell_lines } from "../../../assets/cellLine-selected.svg";
import { ReactComponent as users } from "../../../assets/user-selected.svg";
// import { ReactComponent as settings } from "../../../assets/settings-selected.svg";
import LeftNavPanelListItem from "../../molecules/LeftNavPanelListItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfileQuery } from "../../../generated/graphql";
import { loaderCountVar } from "../../../apollo/cache";
import { ROUTES } from "../../../constants";

const openWidth = 240;
const closedWidth = 80;

const leftNavItems = [
  {
    id: 1,
    label: "Runs",
    src: runs,
    path: `${ROUTES.RUNS}`,
  },
  {
    id: 2,
    label: "Plates",
    src: plates,
    path: `${ROUTES.PLATES}`,
  },
  // {
  //   id: 3,
  //   label: "Reports",
  //   src: reports,
  //   path: `${ROUTES.REPORTS}`,
  // },
  // {
  //   id: 4,
  //   label: "Metrics",
  //   src: metrics,
  //   path: `${ROUTES.METRICS}`,
  // },
  // {
  //   id: 5,
  //   label: "Cell Lines",
  //   src: cell_lines,
  //   path: `${ROUTES.CELL_LINES}`,
  // },
  {
    id: 6,
    label: "Reviewers",
    src: users,
    path: `${ROUTES.REVIEWERS}`,
  },
  // {
  //   id: 7,
  //   label: "User Management",
  //   src: settings,
  //   path: `${ROUTES.USER_MANAGEMENT}`,
  // },
];

export function LeftNavPanel() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedRoute = useCallback(() => {
    return leftNavItems.find((item) => item.path === location.pathname);
  }, [location.pathname]);

  const [selectedItem, setSelectedItem] = useState<number>(2);
  const handleMenuItemClick = (itemId: number, itemPath: string) => {
    setSelectedItem(itemId);
    navigate(`${itemPath}`);
  };

  const { data: userProfileData, loading: userProfileLoading } =
    useUserProfileQuery();

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!userProfileLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (userProfileLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [userProfileLoading]);

  useEffect(() => {
    const item = getSelectedRoute();
    setSelectedItem(item?.id ?? 0);
  }, [getSelectedRoute, location.pathname]);

  const firstName = (userProfileData?.userProfile?.firstName as string) || "";
  const lastName = (userProfileData?.userProfile?.lastName as string) || "";

  return (
    <Paper
      css={{
        width: open ? openWidth : closedWidth,
        height: "100%",
        position: "relative",
      }}
      elevation={4}
    >
      <div
        css={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridAutoFlow: "row",
          paddingTop: 16,
        }}
      >
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            gap: 8,
            gridAutoFlow: "column",
            justifyContent: "start",
            paddingLeft: 24,
            position: "relative",
          }}
        >
          <img src={cellino_small} alt={"cellino-small"} />
          {open && <img src={cellino_name} alt={"cellino-name"} />}
          <IconButton
            size={"small"}
            disableRipple
            data-testid="cellino-logo"
            onClick={() => setOpen((prevState) => !prevState)}
            css={{
              position: "absolute",
              borderRadius: "50%",
              boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.1)",
              top: open ? "50%" : "62%",
              right: 0,
              transform: "translate(50%, -50%)",
              zIndex: 10,
              backgroundColor: "#ffffff",
            }}
          >
            {open ? (
              <ChevronLeftIcon fontSize={"small"} />
            ) : (
              <ChevronRightIcon
                fontSize={"small"}
                data-testid="chevron-right"
              />
            )}
          </IconButton>
        </div>

        <div
          css={{
            overflowY: "auto",
            overflowX: "hidden",
            paddingTop: "19px",
          }}
        >
          <List
            css={{
              color: COLORS.BETA_TEXT_LOW_EMPHASIS,
              display: "grid",
              gap: 6,
            }}
          >
            {leftNavItems.map((item) => {
              return (
                <LeftNavPanelListItem
                  key={item.id}
                  open={open}
                  handleListItem={handleMenuItemClick}
                  selectedItem={selectedItem}
                  item={item}
                />
              );
            })}
          </List>
        </div>
        <div
          css={{
            display: "grid",
            gridAutoFlow: "column",
            alignItems: "center",
            gap: 20,
            justifyContent: open ? "start" : "center",
            margin: open ? 12 : "12px 8px",
            padding: open ? 16 : "16px 8px",
            backgroundColor: COLORS.GAMMA_BACKGROUND_01,
            borderRadius: 16,
          }}
        >
          <Avatar alt={"reviewer"}>
            {firstName.charAt(0).concat(lastName.charAt(0))}
          </Avatar>
          {open && (
            <div
              css={{
                display: "grid",
                gridAutoFlow: "row",
              }}
            >
              <Tooltip title={firstName.concat(" ", lastName)} arrow>
                <Typography
                  variant={"caption3"}
                  color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {firstName.concat(" ", lastName)}
                </Typography>
              </Tooltip>

              <Typography variant={"caption3"} color={"#B0B7C3"}>
                {userProfileData?.userProfile?.role?.name as string}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
}
