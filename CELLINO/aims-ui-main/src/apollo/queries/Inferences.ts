import { gql } from "@apollo/client";

export const Inferences = gql`
  query Inferences($imageEventId: ID!) {
    inferences(imageEventId: $imageEventId) {
      name
      metadata
      protocol {
        name
        settings
      }
    }
  }
`;
