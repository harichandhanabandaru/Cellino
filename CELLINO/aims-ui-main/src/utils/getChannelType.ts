export function getchannelType(channelType: string) {
  switch (channelType) {
    case "BRT":
      return "Brightfield";
    case "FLOUR":
      return "Fluorescence";
    case "VIRTUAL":
      return "Virtual";
    default:
      return "Brightfield";
  }
}
