import { gql } from "@apollo/client";

export const UpdateClusterOutline = gql`
  mutation UpdateClusterOutline(
    $id: ID!
    $interiors: [[PointInput]]!
    $exterior: [PointInput]!
    $imageEventId: ID!
  ) {
    updateClusterOutline(
      id: $id
      interiors: $interiors
      exterior: $exterior
      imageEventId: $imageEventId
    ) {
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
      outline
    }
  }
`;
