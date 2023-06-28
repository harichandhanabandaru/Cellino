import { gql } from "@apollo/client";

export const Passages = gql`
  query Passages {
    passages {
      passagenumber
    }
  }
`;
