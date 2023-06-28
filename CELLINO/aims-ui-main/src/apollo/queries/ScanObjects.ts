import { gql } from "@apollo/client";

export const ScanObjects = gql`
  query ScanObjects($imageAnalysisRequestId: ID!, $imageEventId: ID!) {
    scanObjects(
      imageAnalysisRequestId: $imageAnalysisRequestId
      imageEventId: $imageEventId
    ) {
      content {
        id
        name
        outline
        attributes
        imageEvent {
          id
        }
        imageAnalysisRequest {
          id
        }
      }
      pageInfo {
        page
        size
        totalElements
      }
    }
  }
`;
