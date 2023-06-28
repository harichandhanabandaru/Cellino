import { gql } from "@apollo/client";

export const Protocols = gql`
  query Protocols($category: String) {
    protocols(category: $category) {
      content {
        name
        id
      }
    }
  }
`;
