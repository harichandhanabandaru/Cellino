import { render, screen } from "@testing-library/react";
import ProtocolRightPanel from "..";

describe("protocol right panel", () => {
  it("should render the tree view", () => {
    render(
      <ProtocolRightPanel
        settingsData={
          '{"category": "status-update","timeout_sec": 300, "output_types": [], "provision_settings": {"version": 1, "endpoint": "gcf_finalize_clone_well", "namespace": "prod", "provision_type": "pubsub","z-indices":[2, 4, 6]}, "optional_parameters": {}, "required_parameters": {"success": true,"time_index": null}}'
        }
        handleClose={jest.fn()}
      />
    );
    const element = screen.getByText("Category");
    expect(element).toBeInTheDocument();
  });
});
