import { Typography } from "@mui/material";
import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";
import MultiselectList from "..";
import {
  RunAndPassageFilterData,
  renderRunAndPassageName,
} from "../../PlatesView/renderers/renderRunAndPassageName";

export default {
  title: "Organisms/MultiselectList",
  component: MultiselectList,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4698%3A41115",
    },
  },
} as Meta;

const data: RunAndPassageFilterData[] = [
  { id: "Cell", name: "Cell" },
  { id: "Well", name: "Well" },
  { id: "Run", name: "Run" },
  { id: "Plate", name: "Plate" },
  { id: "Colony", name: "Colony" },
];

const Template: Story = () => {
  const [filteredData, setFilteredData] = useState<RunAndPassageFilterData[]>(
    []
  );

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "row",
      }}
    >
      <div>
        <MultiselectList
          label={"Reviewer"}
          data={data}
          selectedData={filteredData}
          setSelectedData={setFilteredData}
          renderOption={renderRunAndPassageName}
          getOptionLabel={(option) => option.name}
        />
      </div>
      <br />
      <>
        <Typography variant={"caption2"}>Selected Name : </Typography>
        <ul>
          {filteredData.map((ele) => {
            return (
              <li>
                <Typography variant={"caption2"}>{ele.name}</Typography>
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
};

export const RunName = Template.bind({});
