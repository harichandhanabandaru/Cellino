import { gql } from "@apollo/client";

export const UpdateColony = gql`
  mutation UpdateColony($updateColonyId: ID!, $ops: [PatchOperation!]!) {
    updateColony(id: $updateColonyId, ops: $ops) {
      id
      isSelected
      name
      quality
      type
      clonality
      outline
    }
  }
`;
