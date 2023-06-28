import { gql } from "@apollo/client";

export const GetThumbnails = gql`
  query Thumbnails(
    $wellId: ID!
    $width: Int
    $analysisStatus: ImageEventAnalysisStatus
    $isBaseImage: Boolean
  ) {
    imageEvents(
      wellId: $wellId
      analysisStatus: $analysisStatus
      isBaseImage: $isBaseImage
    ) {
      derivedArtifacts(width: $width) {
        bucket
        datatype
        blob_path
        height
        width
      }
      id
      event {
        id
      }
      startedAt
      artifactPath
    }
  }
`;
