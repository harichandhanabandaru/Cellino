import { gql } from "@apollo/client";

export const UpdateWellStatus = gql`
  mutation UpdateWellStatus($wellId: ID!, $ops: [PatchOperation!]!) {
    updateWellStatus(wellId: $wellId, ops: $ops) {
      id
      name
      status
    }
  }
`;
