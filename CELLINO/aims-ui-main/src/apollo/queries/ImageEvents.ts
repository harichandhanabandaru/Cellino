import { gql } from "@apollo/client";

export const ImageEvents = gql`
  query ImageEventsForEventId(
    $eventId: ID
    $analysisStatus: ImageEventAnalysisStatus
    $isBaseImage: Boolean
  ) {
    imageEvents(
      eventId: $eventId
      analysisStatus: $analysisStatus
      isBaseImage: $isBaseImage
    ) {
      id
      name
      reviewStatus
      imageMeasurements
      artifactPath
      well {
        id
        position
        status
      }
    }
  }
`;
