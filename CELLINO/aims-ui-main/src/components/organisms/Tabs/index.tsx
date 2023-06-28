// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { TabsProps, Tabs as MuiTabs, Tab, TabProps } from "@mui/material";
import React from "react";
import theme from "../../../theme";
import { COLORS } from "../../../theme/Colors";

export interface ITabProps extends TabProps {
  // tabpanel prop holds the component that will be rendered when the tab is clicked.
  tabpanel?: React.ReactNode;
  path?: string;
}
export interface ITabsProps extends TabsProps {
  tabs: ITabProps[];
  activeTab?: number;
  handleRedirection?: (newValue: number) => void;
}

const Tabs = ({ activeTab = 0, handleRedirection, ...rest }: ITabsProps) => {
  const [activeTabValue, setActiveTabValue] = React.useState(activeTab);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabValue(newValue);
    handleRedirection && handleRedirection(newValue);
  };

  return (
    <div css={{ width: "100%" }}>
      <div css={{ borderBottom: `1px solid ${COLORS.GAMMA_HEATMAP_100}` }}>
        <MuiTabs value={activeTabValue} onChange={handleTabChange} {...rest}>
          {rest.tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                {...tab}
                disableRipple
                sx={{
                  textTransform: "none",
                  ...theme.typography.body3,
                }}
              />
            );
          })}
        </MuiTabs>
      </div>
      {rest.tabs.map((tab, index) => {
        return index === activeTabValue ? (
          <div key={index} css={{ width: "100%" }}>
            {tab.tabpanel}
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Tabs;
