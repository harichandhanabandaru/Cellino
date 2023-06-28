import { gql } from "@apollo/client";

export const GetUserProfile = gql`
  query UserProfile {
    userProfile {
      id
      firstName
      lastName
      email
      role {
        id
        name
        rule {
          subject
          action
          inverted
        }
      }
    }
  }
  query AllUsers {
    users {
      id
      firstName
      lastName
      email
      role {
        name
      }
    }
  }
`;
