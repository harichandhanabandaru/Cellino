import { gql } from "@apollo/client";

export const CreateColonyAndCluster = gql`
  mutation createColonyAndCluster(
    $colonyData: CreateColonyRequest!
    $clusterData: CreateClusterRequest!
  ) {
    createColonyAndCluster(colonyData: $colonyData, clusterData: $clusterData) {
      colony {
        id
        isSelected
        name
        quality
        type
        clonality
        outline
      }
      cluster {
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
  }
`;
