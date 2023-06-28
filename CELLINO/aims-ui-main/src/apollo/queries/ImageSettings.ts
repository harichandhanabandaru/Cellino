import { gql } from "@apollo/client";

export const ImageSettings = gql`
  query ImageSettings($imageSettingsId: ID!) {
    imageSettings(id: $imageSettingsId) {
      id
      name
      channelType
      magnification
      colorMap
      numberOfZStep
      zarray
      zmin
      zmax
      metadata
    }
  }
`;
