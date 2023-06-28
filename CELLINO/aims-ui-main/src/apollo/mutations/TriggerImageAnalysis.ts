import { gql } from "@apollo/client";

export const TriggerImageAnalysis = gql`
  mutation TriggerImageAnalysis(
    $triggerAnalysisRequest: TriggerImageAnalysisRequest!
  ) {
    triggerImageAnalysis(triggerAnalysisRequest: $triggerAnalysisRequest) {
      id
      name
      statusCode
    }
  }
`;
