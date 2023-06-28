import { gql } from "@apollo/client";

export const UpdateScanObject = gql`
  mutation UpdateScanObject(
    $id: ID!
    $interiors: [[PointInput]]!
    $exterior: [PointInput]!
    $imageEventId: ID!
  ) {
    updateScanObject(
      id: $id
      interiors: $interiors
      exterior: $exterior
      imageEventId: $imageEventId
    ) {
      id
      outline
    }
  }
`;
