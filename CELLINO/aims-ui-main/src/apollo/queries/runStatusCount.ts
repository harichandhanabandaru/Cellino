import { gql } from "@apollo/client";

export const Phases = gql`
  query RunStatusCount {
    runStatusCount {
      runStatus
      count
    }
  }
`;
