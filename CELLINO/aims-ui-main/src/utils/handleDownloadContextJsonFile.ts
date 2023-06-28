export const handleDownloadContextJsonFile = (
  contextJson: object,
  isPlateContext = false
) => {
  const json = JSON.stringify(contextJson);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${
      isPlateContext ? "plate-context" : "context"
    }-${new Date().getTime()}.json`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
