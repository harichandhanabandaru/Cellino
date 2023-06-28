import { gql } from "@apollo/client";

export const deleteScanObject = gql`
  mutation deleteScanObject($id: ID!) {
    deleteScanObject(id: $id) {
      status
      message
    }
  }
`;
