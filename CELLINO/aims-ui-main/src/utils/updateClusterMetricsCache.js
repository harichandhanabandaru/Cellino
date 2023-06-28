import { ColoniesAndClustersInferencesScanObjects } from "../apollo/queries/ColoniesAndClustersInferences";

function updateClusterMetricsCache(
  cache,
  imageAnalysisRequestId,
  imageEventId,
  operation = "increment"
) {
  const existingData = cache.readQuery({
    query: ColoniesAndClustersInferencesScanObjects,
    variables: {
      imageEventId,
      freeClusterMetrics: true,
    },
  });
  const clusterMetrics = [...existingData.clusterMetrics];
  const index = clusterMetrics.findIndex(
    (x) => x.imageAnalysisRequest.id === imageAnalysisRequestId
  );
  if (index >= 0) {
    const clusterMetric = { ...clusterMetrics[index] };
    clusterMetric.count =
      operation === "increment"
        ? clusterMetric.count + 1
        : clusterMetric.count - 1;
    clusterMetrics[index] = clusterMetric;
    cache.writeQuery({
      query: ColoniesAndClustersInferencesScanObjects,
      variables: {
        imageEventId,
        freeClusterMetrics: true,
      },
      data: {
        ...existingData,
        clusterMetrics,
      },
    });
  }
}

export default updateClusterMetricsCache;
