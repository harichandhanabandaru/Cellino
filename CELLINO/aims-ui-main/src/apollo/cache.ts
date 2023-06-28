import { InMemoryCache, makeVar } from "@apollo/client";
import { Cluster, Colony, ScanObject } from "../generated/graphql";

export const cache = new InMemoryCache({
  typePolicies: {
    Plate: { keyFields: ["id", "run"] },
    Query: {
      fields: {
        plates: {
          keyArgs: [
            "currentPhaseId",
            "runIds",
            "reviewerIds",
            "plateNameList",
            "passageList",
          ],
          merge(existing, incoming) {
            const existingContent = existing?.content ?? [];
            const incomingContent = incoming.content;

            // Why am I rewriting the caching logic?
            // Well, previously we only accounted for only pagination so we appended the data.
            // Now, due to new changes the same call might happen again, which lead to data duplication.
            // For removing the duplication, we are modifying the logic to store only the unique records.
            const mergeContent = [...existingContent];

            incomingContent.forEach((ele: any) => {
              // Why am I using __ref instead of id filtering? Because I cannot access it somehow.
              const tempRuns = mergeContent.filter(
                (plate: any) => plate.__ref === ele.__ref
              );
              if (tempRuns.length > 0) {
                const idx = mergeContent.indexOf(tempRuns[0]);
                mergeContent[idx] = ele;
              } else if (tempRuns.length === 0) {
                mergeContent.push(ele);
              }
            });

            return {
              ...incoming,
              content: mergeContent,
            };
          },
        },
      },
    },
  },
});

export const canDrawInternalPolygonVar = makeVar<boolean>(false);

export const showInferenceLayerVar = makeVar<boolean>(false);

export const inferenceDataVar = makeVar<any[]>([]);

export const imageEventDataVar = makeVar<any[]>([]);

export const imageEventIndexVar = makeVar(-1);

export const scaleBarDataVar = makeVar({
  x: 0,
  y: 0,
  value: "",
  height: 0,
  width: 0,
});

export const loaderCountVar = makeVar({ count: 0 });

export const cookieAuthenticatedVar = makeVar(false);

export const wellReviewCompletedVar = makeVar<{
  reviewCompleted: boolean;
  wellName: string;
}>({
  reviewCompleted: false,
  wellName: "",
});

export const scanObjectsByAnalysisIdVar = makeVar<{
  [p: string]: ScanObject[];
}>({});

export const showScanObjectVar = makeVar(false);

export const selectedScanObjectIndexVar = makeVar(-1);

export const selectedClusterIdVar = makeVar<string>("");

export const clustersByAnalysisRequestOrColonyQualityVar = makeVar<{
  [p: string]: { clusters?: Cluster[]; isVisible: Boolean };
}>({});

export const coloniesByQualityVar = makeVar<{ [p: string]: Colony[] }>({});

export const zAxisIndexVar = makeVar<number | undefined>(undefined);
export const zAxisValueVar = makeVar<number | undefined>(undefined);
