import { render, screen } from "@testing-library/react";
import DynamicTreeView from "../index";
describe("DynamicTreeView rendered", function () {
  it("DynamicTreeView data rendering", async function () {
    const treeViewRenderData = {
      sendai_x1356_m2D5_z0_4_8_12: {
        metadata: {
          width: 12224,
          height: 12224,
          data_type: "zarr",
          pixel_size: 0.6753,
          z_offset_um: 0,
        },
        protocol: "70824293-ce79-41e6-baa1-96c7dc4574b4",
      },
    };
    render(<DynamicTreeView treeViewRenderData={treeViewRenderData} />);
    expect(screen.getByTestId("DynamicTreeView")).toBeInTheDocument();
  });
});
