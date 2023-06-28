import { ColoniesAndClustersInferencesScanObjects } from "../apollo/queries/ColoniesAndClustersInferences";

function updateMetricCacheForScanObjects(
  cache,
  imageAnalysisRequestId,
  imageEventId
) {
  const existingData = cache.readQuery({
    query: ColoniesAndClustersInferencesScanObjects,
    variables: {
      imageEventId: imageEventId,
      freeClusterMetrics: true,
    },
  });
  const scanObjectMetrics = [...existingData.scanObjectMetrics];
  const index = scanObjectMetrics.findIndex(
    (x) => x.imageAnalysisRequest.id === imageAnalysisRequestId
  );
  if (index >= 0) {
    const scanObjectMetric = { ...scanObjectMetrics[index] };
    scanObjectMetric.count = scanObjectMetric.count - 1;
    scanObjectMetrics[index] = scanObjectMetric;
    cache.writeQuery({
      query: ColoniesAndClustersInferencesScanObjects,
      variables: {
        imageEventId: imageEventId,
        freeClusterMetrics: true,
      },
      data: {
        ...existingData,
        scanObjectMetrics,
      },
    });
  }
}
export default updateMetricCacheForScanObjects;
