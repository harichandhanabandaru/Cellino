import { gql } from "@apollo/client";

export const GENERATE_TOKEN = gql`
  mutation GenerateToken {
    generateToken {
      token
    }
  }
`;
