import { useCallback, useEffect, useState } from "react";
import { Inference } from "../../../constants/types";
import { useInferencesLazyQuery } from "../../../generated/graphql";
import GenericAccordion from "../../molecules/GenericAccordion";
import DynamicTreeView from "../../molecules/DynamicTreeView";

interface InferenceData {
  string: {
    metadata?: any;
    protocol?: any;
  };
}
export const generateInferenceData = (
  data: Inference[] | undefined
): InferenceData[] => {
  const inferenceData: InferenceData[] = [];
  if (data !== undefined) {
    data.forEach((inference: Inference) => {
      const protocol = {
        name: inference?.protocol?.name,
        settings: inference?.protocol?.settings,
      };
      const metadataAndProtocolData = {
        protocol: protocol,
        metadata: inference?.metadata,
      };
      const inferenceName = inference?.name ?? "";
      const newObj: any = {};
      newObj[`${inferenceName}`] = metadataAndProtocolData;
      inferenceData.push(newObj);
    });
  }
  return inferenceData;
};

function InferencesAccordionWrapper({
  selectedImageEventId,
  count,
}: {
  selectedImageEventId: string | null;
  count: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [getInferencesData, { data: inferencesData }] =
    useInferencesLazyQuery();

  useEffect(() => {
    if (expanded && selectedImageEventId) {
      getInferencesData({
        variables: {
          imageEventId: selectedImageEventId,
        },
      });
    }
  }, [expanded, getInferencesData, selectedImageEventId]);

  const showData = useCallback(() => {
    return generateInferenceData(inferencesData?.inferences as Inference[]).map(
      (inference: InferenceData, index: number) => {
        return <DynamicTreeView treeViewRenderData={inference} key={index} />;
      }
    );
  }, [inferencesData?.inferences]);

  return (
    <GenericAccordion
      data-testid={"GenericAccordion"}
      expanded={expanded}
      onExpandedChange={() => setExpanded((prevState) => !prevState)}
      name={`Inference (${count})`}
      showData={showData}
    />
  );
}

export default InferencesAccordionWrapper;
