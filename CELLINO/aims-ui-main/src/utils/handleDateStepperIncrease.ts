import { ImageEvent } from "../generated/graphql";

function handleDateStepperIncrease(
  selectedImageEventId: string,
  imageMeasurements: ImageEvent[]
) {
  const index = imageMeasurements.findIndex(
    (x) => x.id === selectedImageEventId
  );
  let newEventImageId = selectedImageEventId;
  if (index < imageMeasurements.length - 1 && index > -1) {
    let selectedDate = new Date(imageMeasurements[index].startedAt!);
    for (let i = index + 1; i < imageMeasurements.length; i++) {
      const tempDate = new Date(imageMeasurements[i].startedAt!);
      if (
        selectedDate.getUTCDate() < tempDate.getUTCDate() ||
        selectedDate.getUTCMonth() < tempDate.getUTCMonth() ||
        selectedDate.getUTCFullYear() < tempDate.getUTCFullYear()
      ) {
        newEventImageId = imageMeasurements[i].id!;
        break;
      }
    }
  }
  return newEventImageId;
}

export default handleDateStepperIncrease;
