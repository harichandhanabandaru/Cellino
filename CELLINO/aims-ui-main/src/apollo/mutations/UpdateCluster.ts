import { gql } from "@apollo/client";

export const UpdateCluster = gql`
  mutation UpdateCluster($updateClusterId: ID!, $ops: [PatchOperation!]!) {
    updateCluster(id: $updateClusterId, ops: $ops) {
      id
      clonality
      colony {
        id
      }
      name
      quality
      type
      imageEvent {
        id
      }
      imageAnalysisRequest {
        id
        name
      }
      outline
    }
  }
`;
