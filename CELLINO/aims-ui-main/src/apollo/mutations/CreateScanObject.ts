import { gql } from "@apollo/client";

export const CreateScanObject = gql`
  mutation CreateScanObject($scanObjectData: CreateScanObjectRequest!) {
    createScanObject(scanObjectData: $scanObjectData) {
      id
      name
      imageEvent {
        id
      }
      outline
      imageAnalysisRequest {
        id
        name
      }
      attributes
    }
  }
`;
