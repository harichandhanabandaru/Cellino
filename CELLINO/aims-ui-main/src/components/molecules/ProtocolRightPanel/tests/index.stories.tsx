import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProtocolRightPanel from "..";

export default {
  title: "Molecules/ProtocolRightPanel",
  component: ProtocolRightPanel,
} as ComponentMeta<typeof ProtocolRightPanel>;

const Template: ComponentStory<typeof ProtocolRightPanel> = (args) => (
  <ProtocolRightPanel {...args} />
);

export const RightPanel = Template.bind({});
RightPanel.args = {
  settingsData:
    '{"plate_type":"Ibidi 96-well Au Mixed","instrument_id":null,"protocol_file":"gs://cell-nas/NAS/ImagingProtocols/ACQ_PROFILE_128.txt","acq_matching_hash":"5881dd16cbd7e88f9de84bf5dc688f4f","moldev_protocol_id":128}',
};
