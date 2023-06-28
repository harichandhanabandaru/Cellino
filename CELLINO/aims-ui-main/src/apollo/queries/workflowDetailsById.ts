import { gql } from "@apollo/client";

export const WorkflowDetailsById = gql`
  query WorkflowDetailsById($workflowDetailsId: ID!) {
    workflowDetails(id: $workflowDetailsId) {
      id
      type
      version
      name
      objective
      phases {
        phaseName
      }
      createdBy
      createdAt
      modifiedBy
      modifiedAt
    }
  }
`;
