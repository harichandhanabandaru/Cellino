import { ColoniesAndClustersInferencesScanObjects } from "../apollo/queries/ColoniesAndClustersInferences";

function updateCacheForScanObjects(cache, newScanObject, imageEventId) {
  const existingData = cache.readQuery({
    query: ColoniesAndClustersInferencesScanObjects,
    variables: {
      imageEventId: imageEventId,
      freeClusterMetrics: true,
    },
  });
  const scanObjectMetrics = [...existingData.scanObjectMetrics];
  const index = scanObjectMetrics.findIndex(
    (x) => x.imageAnalysisRequest.id === newScanObject.imageAnalysisRequest.id
  );
  if (index >= 0) {
    const scanObjectMetric = { ...scanObjectMetrics[index] };
    scanObjectMetric.count = scanObjectMetric.count + 1;
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
  } else {
    const scanObjectMetric = {
      count: 1,
      imageAnalysisRequest: {
        id: newScanObject.imageAnalysisRequest?.id,
        name: newScanObject.imageAnalysisRequest?.name,
        __typename: "ImageAnalysisRequest",
      },
      __typename: "ScanObjectMetrics",
    };
    scanObjectMetrics.push(scanObjectMetric);
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

export default updateCacheForScanObjects;
