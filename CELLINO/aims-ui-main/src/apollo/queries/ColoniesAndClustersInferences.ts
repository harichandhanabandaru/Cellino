import { gql } from "@apollo/client";

//TODO: Remove the colonies query, and fetch the colonies only when the right panel is expanded
export const ColoniesAndClustersInferencesScanObjects = gql`
  query Colonies($imageEventId: ID!, $freeClusterMetrics: Boolean) {
    inferences(imageEventId: $imageEventId) {
      id
      name
      artifactPath
    }
    colonyMetrics(imageEventId: $imageEventId) {
      imageEventId
      colonyCountByQuality {
        count
        quality
      }
    }
    scanObjectMetrics(imageEventId: $imageEventId) {
      imageAnalysisRequest {
        id
        name
      }
      count
    }
    clusterMetrics(
      imageEventId: $imageEventId
      freeClusters: $freeClusterMetrics
    ) {
      imageAnalysisRequest {
        id
        name
      }
      count
    }
    imageEvent(id: $imageEventId) {
      id
      metadata
      startedAt
      completedAt
      protocol {
        id
      }
      imageSetting {
        id
        name
        channelType
        magnification
        colorMap
        metadata
        numberOfZStep
        zarray
        zmin
        zmax
      }
      artifactPath
    }
  }
`;
