import { Meta, Story } from "@storybook/react/types-6-0";
import ClonalityTimeframeItem, { ClonalityTimeframeItemProps } from "..";
import wellImg from "../../../../assets/Thumbnail.jpg";

export default {
  title: "Molecules/ClonalityTimeframeItem",
  component: ClonalityTimeframeItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1X6YyHn4AVGsHdG94cbNSh/Cellino-Devs-MVP-1?node-id=4699%3A70853",
    },
  },
} as Meta;

const Template: Story<ClonalityTimeframeItemProps> = (args) => (
  <ClonalityTimeframeItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  img: wellImg,
  time: "06:30",
  date: "22 Mar",
};

export const ImageWithoutDate = Template.bind({});
ImageWithoutDate.args = {
  img: wellImg,
  time: "06:30",
  date: "",
};

export const SelectedImage = Template.bind({});
SelectedImage.args = {
  img: wellImg,
  time: "06:30",
  date: "22 Mar",
  selected: true,
};
