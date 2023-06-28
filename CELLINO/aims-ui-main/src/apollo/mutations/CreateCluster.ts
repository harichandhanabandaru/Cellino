import { gql } from "@apollo/client";

export const CreateCluster = gql`
  mutation CreateCluster($clusterData: CreateClusterRequest!) {
    createCluster(clusterData: $clusterData) {
      id
      colony {
        id
      }
      name
      type
      quality
      imageEvent {
        id
      }
      imageAnalysisRequest {
        id
        name
      }
      outline
      clonality
    }
  }
`;
