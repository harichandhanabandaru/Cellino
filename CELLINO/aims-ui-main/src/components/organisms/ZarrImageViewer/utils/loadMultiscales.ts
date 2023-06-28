import type { Group as ZarrGroup } from "zarr";
import { ZarrArray } from "zarr";

// interface Axis {
//   name: string;
//   type?: string;
// }

// interface MultiscaleV1 {
//   datasets: { path: string }[];
//   version?: string;
//   axes?: string[] | Axis[];
// }

async function loadMultiscales(
  grp: ZarrGroup,
  // TODO: MultiscaleV1 & MultiscaleV2 interfaces need to be defined
  multiscales: any[],
  version?: number
) {
  let nodes = [];

  if (version === 2) {
    nodes = await Promise.all(multiscales.map(({ path }) => grp.getItem(path)));
  } else {
    const { datasets } = multiscales[0] || [{ path: "0" }];
    nodes = await Promise.all(
      datasets.map(({ path }: { path: string }) => grp.getItem(path))
    );
  }
  if (nodes.every((node): node is ZarrArray => node instanceof ZarrArray)) {
    return nodes;
  }
  throw Error("Multiscales metadata included a path to a group.");
}

export default loadMultiscales;
