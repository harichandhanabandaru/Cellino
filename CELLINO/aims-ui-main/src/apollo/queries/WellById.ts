import { gql } from "@apollo/client";

export const WellBYId = gql`
  query WellById($wellId: ID!) {
    well(wellId: $wellId) {
      id
      position
      reviewStatus
      status
      plateId
      statusReason
      analysisStatus
      analysisStatusDetail
      processStatus
    }
  }
`;
