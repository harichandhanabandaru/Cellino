import { gql } from "@apollo/client";

//Update query name
export const Colonies = gql`
  query TempColonies($imageEventId: ID!, $quality: Quality) {
    Colonies(imageEventId: $imageEventId, quality: $quality) {
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
