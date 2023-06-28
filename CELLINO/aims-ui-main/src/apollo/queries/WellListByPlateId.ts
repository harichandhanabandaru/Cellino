import { gql } from "@apollo/client";

export const WellListAndPlateById = gql`
  query WellListAndPlateById($plateId: ID!) {
    wells(plateId: $plateId) {
      id
      position
      reviewStatus
    }
    plate(id: $plateId) {
      id
      reviewStatus
      processStatus
      currentPhaseId
      run {
        name
        id
        objective
        summary
        cloneReviewStatus
        runDay
        seedingDay
        phaseId
        runReviewer {
          id
          firstName
          lastName
        }
        partner {
          id
          name
        }
        workflow {
          id
          type
          name
        }
        status
        workflowId
        runOwner {
          id
          firstName
          lastName
        }
      }
      reviewers {
        id
        firstName
        lastName
      }
      barcode
      labware {
        id
        name
        attributes
      }
      analysisStatus
      analysisStatusDetail
      plateStatus
      plateStatusReason
      processStatusDetail
      name
    }
  }
`;
