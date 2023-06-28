// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import HeatMapStepperItem from "../../molecules/HeatMapStepperItem";
import { WellGrid } from "../../molecules/WellGrid";
import { PlateEvent } from "../../pages/PlateViewPage";
import { ROUTES } from "../../../constants";

interface WellHeatMapProps {
  plateId: string | null;
  attributeValue: string;
  eventBasedWellData: any;
  eventData: any;
  totalColonies: number;
  handleImageSelect: (event: PlateEvent) => void;
  selectedEventImage: PlateEvent;
  totalCells: number;
  plateStatus: string;
  plateProcessStatus: string;
  isCircular: boolean;
  aspectRatio: number;
  rows: number;
  columns: number;
}

const getDate = (date: string) => {
  const currentDate = new Date(date);
  return currentDate.toUTCString().slice(5, 17);
};

const WellHeatMapTimeSeries = ({
  plateId,
  attributeValue,
  eventBasedWellData,
  eventData,
  totalColonies,
  selectedEventImage,
  handleImageSelect,
  totalCells,
  plateStatus,
  plateProcessStatus,
  isCircular,
  aspectRatio,
  rows,
  columns,
}: WellHeatMapProps) => {
  const navigate = useNavigate();

  const handleWellItemSelect = (wellId: string) => {
    navigate({
      pathname: `${ROUTES.IMAGE_VIEWER}`,
      search: `?plateId=${plateId}&wellId=${wellId}&eventId=${selectedEventImage?.id}`,
    });
  };

  return (
    <div css={{ display: "grid", gridAutoFlow: "row", gap: 10 }}>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "start",
          marginLeft: "20px",
          marginTop: "10px",
        }}
      >
        {eventData?.map(
          (
            event: {
              date: string;
              events: PlateEvent[];
              runDay: string;
            },
            index: number
          ) => {
            return (
              <HeatMapStepperItem
                key={index}
                runDay={event.runDay}
                date={getDate(event.date)}
                listOfEvents={event.events}
                selectedEventImageId={selectedEventImage}
                setSelectedEventImageId={handleImageSelect}
                islastImage={index === eventData?.length - 1}
              />
            );
          }
        )}
      </div>
      <WellGrid
        rows={rows}
        columns={columns}
        wellValues={eventBasedWellData}
        onClick={handleWellItemSelect}
        attributeValue={attributeValue}
        totalColonies={totalColonies}
        totalCells={totalCells}
        plateStatus={plateStatus}
        plateProcessStatus={plateProcessStatus}
        isCircular={isCircular}
        aspectRatio={aspectRatio}
      />
    </div>
  );
};

export default WellHeatMapTimeSeries;
