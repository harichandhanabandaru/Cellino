import { ColoniesAndClustersInferencesScanObjects } from "../apollo/queries/ColoniesAndClustersInferences";

function updateColonyMetrics(cache, imageEventId, quality) {
  const existingData = cache.readQuery({
    query: ColoniesAndClustersInferencesScanObjects,
    variables: {
      imageEventId: imageEventId,
      freeClusterMetrics: true,
    },
  });
  const colonyMetrics = [...existingData.colonyMetrics?.colonyCountByQuality];
  const index = colonyMetrics.findIndex((x) => x.quality === quality);
  if (index >= 0) {
    const colonyMetric = { ...colonyMetrics[index] };
    colonyMetric.count++;
    colonyMetrics[index] = colonyMetric;
  } else {
    const colonyMetric = {
      count: 1,
      quality,
      __typename: "ColonyCountByQuality",
    };
    colonyMetrics.push(colonyMetric);
  }

  cache.writeQuery({
    query: ColoniesAndClustersInferencesScanObjects,
    variables: {
      imageEventId: imageEventId,
      freeClusterMetrics: true,
    },
    data: {
      ...existingData,
      colonyMetrics: {
        ...existingData.colonyMetrics,
        colonyCountByQuality: colonyMetrics,
      },
    },
  });
}

export default updateColonyMetrics;
