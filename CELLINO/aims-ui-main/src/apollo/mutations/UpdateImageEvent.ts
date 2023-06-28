import { gql } from "@apollo/client";

export const UpdateImageEvent = gql`
  mutation UpdateImageEvent($imageEventId: ID!, $ops: [PatchOperation!]!) {
    updateImageEvent(imageEventId: $imageEventId, ops: $ops) {
      id
      reviewStatus
    }
  }
`;
