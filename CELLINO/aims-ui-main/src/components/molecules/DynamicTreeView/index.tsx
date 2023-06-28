// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { COLORS } from "../../../theme/Colors";
import { Divider, Typography } from "@mui/material";
import memoize from "memoize-one";
import { capitalizeText } from "../../../utils/formatName";

const treeItemStyle = {
  "& .Mui-focused": {
    backgroundColor: `${COLORS.GAMMA_BACKGROUND_01} !important`,
  },
  marginTop: "12px",
  "& .MuiTreeItem-content": {
    paddingRight: "0px",
  },
  "& .MuiTreeItem-label": {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    fontSize: "14px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "25px",
    letterSpacing: "0.25px",
  },
  "& .Mui-selected": {
    backgroundColor: `${COLORS.GAMMA_BACKGROUND_01} !important`,
  },
  "& .hover": {
    backgroundColor: `${COLORS.GAMMA_BACKGROUND_01} !important`,
  },
  "& .MuiTreeItem-iconContainer": {
    width: 0,
    marginRight: "8px",
  },
};

const getRequiredKeyLabel = (label: string) => {
  const splitArray = label.split("_");
  const convertedLabel = splitArray.join(" ");
  const capitalizedLabel = capitalizeText(convertedLabel);
  return capitalizedLabel;
};

//get the custom label for the tree item
const TreeItemLabel = (label: string, value: any) => {
  const treeItemValue = Array.isArray(value)
    ? value
        .map((element) => {
          if (element) {
            return [element];
          } else if (element === 0) {
            return [element];
          } else {
            return ["null"];
          }
        })
        .toString()
    : value.toString();

  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "space-between",
        gap: "40px",
      }}
    >
      <Typography
        variant="body4"
        color={COLORS.BETA_TEXT_LOW_EMPHASIS}
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {getRequiredKeyLabel(label)}
      </Typography>
      <Typography
        variant="body4"
        sx={{
          textTransform: "none",
          whiteSpace: "nowrap",
        }}
      >
        {treeItemValue}
      </Typography>
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
          return value[0] === null || typeof value[0] !== "object" ? (
            // if the values inside the array is not an object return a comma separted value
            <TreeItem
              key={key}
              nodeId={key}
              label={TreeItemLabel(key, value ?? "-")}
              sx={{
                ...treeItemStyle,
              }}
            />
          ) : (
            //else map the array with objects and render the objects separating by a divider
            <TreeItem
              key={key}
              nodeId={key}
              label={getRequiredKeyLabel(key)}
              sx={{
                ...treeItemStyle,
              }}
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
            sx={{
              ...treeItemStyle,
            }}
          />
        );
      }
      //if the value is an object , then make a recursion call to render nested objects
      return Object.keys(data[key]).length === 0 ? (
        <TreeItem
          key={key}
          nodeId={key}
          label={TreeItemLabel(key, "-")}
          sx={{
            ...treeItemStyle,
          }}
        />
      ) : (
        <TreeItem
          key={key}
          nodeId={key}
          label={getRequiredKeyLabel(key)}
          sx={{
            ...treeItemStyle,
          }}
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
        sx={{
          ...treeItemStyle,
        }}
      />
    );
  });
});

const DynamicTreeView = ({
  treeViewRenderData,
}: {
  treeViewRenderData: any;
}) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      data-testId={"DynamicTreeView"}
    >
      {renderTree(treeViewRenderData)}
    </TreeView>
  );
};

export default DynamicTreeView;
