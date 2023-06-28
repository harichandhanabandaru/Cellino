import { gql } from "@apollo/client";

export const Events = gql`
  query Events($plateId: ID, $eventType: String) {
    events(plateId: $plateId, eventType: $eventType) {
      id
      name
      eventType
      plateId
      startedAt
      completedAt
      createdAt
      createdBy
      modifiedAt
      modifiedBy
      metadata
    }
  }
`;
