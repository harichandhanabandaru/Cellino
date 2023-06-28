import { gql } from "@apollo/client";

export const Runs = gql`
  query Runs(
    $ids: ID
    $nameLike: String
    $page: Int
    $size: Int
    $status: RunStatus
  ) {
    runs(
      ids: $ids
      nameLike: $nameLike
      page: $page
      size: $size
      status: $status
    ) {
      content {
        cloneReviewStatus
        creatorId
        partner {
          id
          name
        }
        name
        objective
        summary
        runDay
        status
        id
        seedingDay
        runMetric {
          activePlatesCount
          activeWellsCount
          originalPlateCount
          runId
          wellsCount
          platesCount
          originalWellCount
        }
        runReviewer {
          id
          firstName
          lastName
        }
        workflow {
          id
          type
          name
        }
        runOwner {
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

  query RunById($runId: ID!) {
    run(id: $runId) {
      id
      name
      objective
      metadata
      summary
      creatorId
      cloneReviewStatus
      runDay
      seedingDay
      status
      partnerId
      workflowId
      processId
      runMetric {
        activePlatesCount
        activeWellsCount
        originalPlateCount
        runId
        wellsCount
        platesCount
        originalWellCount
      }
      runReviewer {
        id
        firstName
        lastName
      }
      runOwner {
        id
        firstName
        lastName
      }
    }
  }
`;
