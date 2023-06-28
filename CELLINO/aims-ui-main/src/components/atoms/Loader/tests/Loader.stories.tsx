import Loader from "..";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Atoms/Loader",
  component: Loader,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YrdlfEemxHqNFzEhKRiqv4/Design-System?node-id=7991%3A24153",
    },
  },
} as Meta<typeof Loader>;

const TemplateLoader: Story<typeof Loader> = () => <Loader />;

export const LoaderComponent = TemplateLoader.bind({});
