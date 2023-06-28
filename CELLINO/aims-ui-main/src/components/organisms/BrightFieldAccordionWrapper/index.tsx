import { useCallback, useState } from "react";
import {
  ImageEvent,
  ImageEventsQuery,
  ImageSetting,
} from "../../../generated/graphql";
import { getchannelType } from "../../../utils/getChannelType";
import GenericAccordion from "../../molecules/GenericAccordion";
import { ImageEventAccordionData } from "../../molecules/ImageEventAccordionData";
import { ImageSettingAccordionField } from "../../molecules/ImageSettingAccordionData";

function BrightFieldAccordionWrapper({
  imageEventsData,
}: {
  imageEventsData?: ImageEventsQuery;
}) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    BRT: false,
    FLOUR: false,
  });

  const getDataForTreeView = useCallback(
    (
      settingData: ImageSetting | null | undefined,
      eventData: ImageEvent | undefined
    ) => {
      return (
        <>
          <ImageSettingAccordionField
            imageSettingData={settingData}
            title={"Image settings"}
          />
          <ImageEventAccordionData imageEventData={eventData} />
        </>
      );
    },
    []
  );

  const brtImageData = useCallback(() => {
    const data = imageEventsData?.imageEvents?.find(
      (ie) => ie?.imageSetting?.channelType === "BRT"
    );
    return getDataForTreeView(data?.imageSetting, data as ImageEvent);
  }, [getDataForTreeView, imageEventsData?.imageEvents]);

  const flourImageData = useCallback(() => {
    const data = imageEventsData?.imageEvents?.find(
      (ie) => ie?.imageSetting?.channelType === "FLOUR"
    );
    return getDataForTreeView(data?.imageSetting, data as ImageEvent);
  }, [getDataForTreeView, imageEventsData?.imageEvents]);

  const getData: Function = useCallback(
    (channelType: string) => {
      if ("BRT" === channelType) {
        return brtImageData;
      } else if ("FLOUR" === channelType) {
        return flourImageData;
      } else return brtImageData;
    },
    [brtImageData, flourImageData]
  );
  return (
    <>
      {imageEventsData?.imageEvents?.map((data: any) => {
        const channelType: string = data?.imageSetting?.channelType;
        return (
          <GenericAccordion
            data-testId={"GenericAccordionForBrightField"}
            expanded={expanded[channelType]}
            onExpandedChange={() =>
              setExpanded((prevState) => ({
                ...prevState,
                [channelType]: !prevState[channelType],
              }))
            }
            key={data?.id}
            name={getchannelType(data?.imageSetting?.channelType)}
            showData={getData(data?.imageSetting?.channelType)}
          />
        );
      })}
    </>
  );
}

export default BrightFieldAccordionWrapper;
