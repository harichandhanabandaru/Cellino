import { gql } from "@apollo/client";

export const UpdatePlate = gql`
  mutation UpdatePlate($updatePlateId: ID!, $ops: [PatchOperation!]!) {
    updatePlate(id: $updatePlateId, ops: $ops) {
      id
      plateStatus
    }
  }
  mutation AssignReviewerToPlates($plateIds: [ID!]!, $userId: ID!) {
    assignReviewerToPlates(plateIds: $plateIds, userId: $userId) {
      status
      message
    }
  }
  mutation UnassignReviewerToPlates($plateId: ID!, $userId: ID!) {
    unassignReviewerToPlate(plateId: $plateId, userId: $userId) {
      status
      message
    }
  }
`;
