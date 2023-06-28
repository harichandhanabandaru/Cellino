import { gql } from "@apollo/client";
export const Phases = gql`
  query PhasesAndPlates(
    $page: Int
    $runIds: [ID]
    $size: Int
    $reviewerIds: [ID]
    $plateNameList: [String]
    $passageList: [String]
  ) {
    phases {
      id
      phaseName
      plateData(
        page: $page
        runIds: $runIds
        size: $size
        reviewerIds: $reviewerIds
        plateNameList: $plateNameList
        passageList: $passageList
      ) {
        content {
          barcode
          run {
            id
            name
            partner {
              id
              name
            }
            runOwner {
              id
              firstName
              lastName
            }
          }
          reviewStatus
          id
          name
          processStatus
          analysisStatus
          currentPhaseId
          plateStatus
          processMetadata {
            downSelectionDay
            passage_number
          }
          reviewers {
            id
            firstName
            lastName
          }
        }
        pageInfo {
          page
          size
          totalElements
        }
      }
    }
  }
  query Phase($phaseId: ID!) {
    phase(id: $phaseId) {
      id
      phaseName
    }
  }
`;
