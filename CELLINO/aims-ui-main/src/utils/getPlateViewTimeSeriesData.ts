import memoize from "memoize-one";
import { PlateEvent } from "../components/pages/PlateViewPage";

const runDay = memoize((index, imageEventData, seedingDay) => {
  if (seedingDay && imageEventData.length > 0) {
    const requestedTime = new Date(imageEventData[index]?.startedAt).getTime();
    const seedingTime = new Date(seedingDay).getTime();
    const diffTime = requestedTime - seedingTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}`;
  } else {
    return "";
  }
});

//converting the required data in the form of associated date and image events
export const getPlateViewImageData = memoize((eventData, seedingDay) => {
  let requiredData: {
    date: string;
    events: PlateEvent[];
    runDay: string;
  }[] = [];
  let counter: number;
  eventData.forEach((event: PlateEvent, index: number) => {
    if (index === 0) {
      requiredData.push({
        date: event?.startedAt ?? "",
        events: [event],
        runDay: runDay(index, eventData, seedingDay),
      });
      counter = 0;
    } else {
      const currentDate = new Date(event?.startedAt ?? "");
      const prevDate = new Date(eventData[index - 1]?.startedAt ?? "");
      // if current date and previous date are different we push a new element in array with new date
      if (
        prevDate.getUTCDate() < currentDate.getUTCDate() ||
        prevDate.getUTCMonth() < currentDate.getUTCMonth() ||
        prevDate.getUTCFullYear() < currentDate.getUTCFullYear()
      ) {
        requiredData.push({
          date: event?.startedAt ?? "",
          events: [event],
          runDay: runDay(index, eventData, seedingDay),
        });
        counter += 1;
      } else {
        // else if both current and prev dates are same will update the array with new event ids
        requiredData[counter] = {
          ...requiredData[counter],
          events: [...requiredData[counter].events, event],
        };
      }
    }
  });
  return requiredData.reverse();
});
