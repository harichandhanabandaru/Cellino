import { gql } from "@apollo/client";

export const ImageEventsByWellId = gql`
  query ImageEvents(
    $eventId: ID
    $wellId: ID
    $analysisStatus: ImageEventAnalysisStatus
  ) {
    imageEvents(
      eventId: $eventId
      wellId: $wellId
      analysisStatus: $analysisStatus
    ) {
      id
      metadata
      startedAt
      completedAt
      protocol {
        id
      }
      imageSetting {
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
      artifactPath
    }
  }
`;
