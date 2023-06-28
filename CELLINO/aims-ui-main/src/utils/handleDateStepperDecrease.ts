import { ImageEvent } from "../generated/graphql";

function handleDateStepperDecrease(
  selectedEventImageId: string,
  imageEvents: ImageEvent[]
) {
  const index = imageEvents.findIndex((x) => x.id === selectedEventImageId);
  let newEventImageId = selectedEventImageId;
  if (index > 0) {
    let selectedDate = new Date(imageEvents[index].startedAt!);
    let ctr = 0;
    for (let i = index - 1; i >= 0; i--) {
      const tempDate = new Date(imageEvents[i].startedAt!);
      if (
        selectedDate.getUTCDate() > tempDate.getUTCDate() ||
        selectedDate.getUTCMonth() > tempDate.getUTCMonth() ||
        selectedDate.getUTCFullYear() > tempDate.getUTCFullYear()
      ) {
        ctr++;
        selectedDate = tempDate;
      }
      if (ctr === 1) {
        newEventImageId = imageEvents[i].id!;
      } else if (ctr > 1) {
        break;
      }
    }
  }
  return newEventImageId;
}

export default handleDateStepperDecrease;
