import { gql } from "@apollo/client";

export const Plates = gql`
  query Plates(
    $currentPhaseId: ID
    $page: Int
    $runIds: [ID]
    $size: Int
    $reviewerIds: [ID]
    $plateNameList: [String]
    $passageList: [String]
  ) {
    plates(
      currentPhaseId: $currentPhaseId
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
          seedingDay
          metadata
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
        assigneeId
        analysisStatusDetail
        analysisStatus
        currentPhaseId
        labware {
          id
          name
          attributes
        }
        eventIds
        processStatus
        plateStatus
        processStatusDetail
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
  query PlateById($plateId: ID!) {
    plate(id: $plateId) {
      id
      processStatus
      currentPhaseId
      run {
        id
        name
        objective
        runDay
        partner {
          id
          name
        }
        workflow {
          id
          type
        }
        seedingDay
      }
      labware {
        id
        name
        attributes
      }
      analysisStatus
      plateStatus
      name
      processMetadata {
        downSelectionDay
        passage_number
      }
    }
  }
  query PlateReviewers($page: Int, $size: Int) {
    plateReviewers(page: $page, size: $size) {
      content {
        user {
          id
          firstName
          lastName
          email
          role {
            id
            name
          }
        }
        plate {
          id
          name
          runId
          runName
        }
      }
      pageInfo {
        totalElements
        page
        size
      }
    }
  }
  query UnassignedPlates(
    $currentPhaseId: ID
    $page: Int
    $runIds: [ID]
    $size: Int
    $reviewerIds: [ID]
  ) {
    plates(
      currentPhaseId: $currentPhaseId
      page: $page
      runIds: $runIds
      size: $size
      reviewerIds: $reviewerIds
    ) {
      content {
        run {
          id
          name
        }
        id
        name
      }
      pageInfo {
        page
        size
        totalElements
      }
    }
  }
  query PlateContext($plateContextId: ID!) {
    plateContext(id: $plateContextId)
  }
`;
