// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { TreeItem, TreeView } from "@mui/lab";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { COLORS } from "../../../theme/Colors";
import Tabs from "../../organisms/Tabs";
import { Divider, Tooltip, Typography } from "@mui/material";
import CloseSvg from "../../../assets/close.svg";
import memoize from "memoize-one";
import { capitalizeText } from "../../../utils/formatName";

// TODO : Generalize this component
interface ProtocolPanel {
  settingsData: string;
  handleClose: () => void;
  tabName?: string;
  rootName?: string;
}

const treeItemStyle = {
  "& .Mui-focused": {
    backgroundColor: `white !important`,
  },
  marginTop: "18px",
  paddingRight: "5px",
  "& .MuiTreeItem-content": {
    paddingRight: "0px",
    paddingLeft: "4px",
  },
  "& .MuiTreeItem-label": {
    fontSize: "16px",
  },
};

const getRequiredKeyLabel = (label: string) => {
  const splitArray = label.split("_");
  const convertedLabel = splitArray.join(" ");
  const capitalizedLabel = capitalizeText(convertedLabel);
  return capitalizedLabel;
};

//get the custom label for the tree item
const TreeItemLabel = (label: string, value: string) => {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "space-between",
        gap: 15,
      }}
    >
      <Typography
        variant="caption1"
        color={COLORS.BETA_TEXT_LOW_EMPHASIS}
        sx={{
          fontSize: "15px",
        }}
      >
        {getRequiredKeyLabel(label)}
      </Typography>
      <Tooltip title={value}>
        <Typography
          variant="caption2"
          sx={{
            color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
            textTransform: "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "15px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>
      </Tooltip>
    </div>
  );
};

// a recursion method to display tree view dynamically
const renderTree = memoize((data) => {
  return Object.keys(data).map((key) => {
    if (data[key] !== null && typeof data[key] === "object") {
      //if the value of an object is array
      if (Array.isArray(data[key])) {
        if (data[key].length > 0) {
          let value = data[key];
          return typeof value[0] !== "object" ? (
            // if the values inside the array is not an object return a comma separted value
            <TreeItem
              key={key}
              nodeId={key}
              label={TreeItemLabel(key, value.toString() ?? "-")}
              sx={{ ...treeItemStyle }}
            />
          ) : (
            //else map the array with objects and render the objects separating by a divider
            <TreeItem
              key={key}
              nodeId={key}
              label={getRequiredKeyLabel(key)}
              sx={{ ...treeItemStyle }}
            >
              {value.map((val: any, index: number) => {
                return (
                  <div>
                    {index !== 0 && (
                      <Divider
                        sx={{ mt: "11px" }}
                        style={{
                          border: `0.3px solid ${COLORS.GAMMA_BACKGROUND_03}`,
                          color: COLORS.GAMMA_BACKGROUND_03,
                        }}
                      />
                    )}
                    {renderTree(val)}
                  </div>
                );
              })}
            </TreeItem>
          );
        }
        // if the array is empty return an empty tree item with custom label
        return (
          <TreeItem
            key={key}
            nodeId={key}
            label={TreeItemLabel(key, "-")}
            sx={{ ...treeItemStyle }}
          />
        );
      }
      //if the value is an object , then make a recursion call to render nested objects
      return Object.keys(data[key]).length === 0 ? (
        <TreeItem
          key={key}
          nodeId={key}
          label={TreeItemLabel(key, "-")}
          sx={{ ...treeItemStyle }}
        />
      ) : (
        <TreeItem
          key={key}
          nodeId={key}
          label={getRequiredKeyLabel(key)}
          sx={{ ...treeItemStyle }}
        >
          {renderTree(data[key])}
        </TreeItem>
      );
    }
    //return a tree item if the value is not an object with a custom label
    const requiredValue = data[key] === null ? "" : data[key].toString();
    return (
      <TreeItem
        key={key + requiredValue}
        nodeId={key + requiredValue}
        label={TreeItemLabel(
          key,
          data[key] === null ? "-" : data[key].toString()
        )}
        sx={{ ...treeItemStyle }}
      />
    );
  });
});

const ProtocolRightPanel = ({
  settingsData,
  handleClose,
  rootName = "Settings",
  tabName = "Info",
}: ProtocolPanel) => {
  return (
    <div
      css={{
        backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
        border: `1px solid ${COLORS.GAMMA_BACKGROUND_03}`,
        position: "relative",
      }}
    >
      <Tabs
        tabs={[
          {
            label: tabName,
            tabpanel: (
              <div
                css={{
                  display: "grid",
                  height: "540px",
                  width: "22vw",
                  overflow: "scroll",
                }}
              >
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  defaultExpanded={[rootName]}
                >
                  {/* rendering settings as high level in tree view */}
                  <TreeItem
                    nodeId={rootName}
                    key={rootName}
                    label={rootName}
                    sx={{
                      "& .Mui-selected": {
                        backgroundColor: `${COLORS.GAMMA_BACKGROUND_WHITE} !important`,
                      },
                      ...treeItemStyle,
                    }}
                  >
                    {/* parse  the string to json*/}
                    {renderTree(JSON.parse(settingsData))}
                  </TreeItem>
                </TreeView>
              </div>
            ),
          },
        ]}
      />
      <div
        css={{
          position: "absolute",
          top: 13,
          right: 18,
          cursor: "pointer",
        }}
        data-testid="close"
        onClick={handleClose}
      >
        <img src={CloseSvg} alt="close" />
      </div>
    </div>
  );
};

export default ProtocolRightPanel;
