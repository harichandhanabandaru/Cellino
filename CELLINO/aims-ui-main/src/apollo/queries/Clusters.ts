import { gql } from "@apollo/client";

export const Clusters = gql`
  query Clusters(
    $imageAnalysisRequestId: ID
    $imageEventId: ID!
    $page: Int
    $size: Int
    $colonyIds: [ID]
    $freeClusters: Boolean
  ) {
    Clusters(
      imageAnalysisRequestId: $imageAnalysisRequestId
      imageEventId: $imageEventId
      page: $page
      size: $size
      colonyIds: $colonyIds
      freeClusters: $freeClusters
    ) {
      content {
        id
        colony {
          id
        }
        name
        type
        quality
        clonality
        imageEvent {
          id
        }
        imageAnalysisRequest {
          id
          name
        }
        outline
      }
      pageInfo {
        totalElements
        page
        size
      }
    }
  }
`;
