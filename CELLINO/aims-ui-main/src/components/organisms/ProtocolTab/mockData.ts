export const rows = [
  {
    phase: "Clone isolation",
    name: "Analysis Request Protocol",
    type: "ML Service",
    id: "70824293-ce79-41e6-baa1-96c7dc4574b4",
    definitionId: "fec6b3c3-3cde-4a6d-83c4-664af6879fb1",
    protocolDefinitionData: `"protocolDefintion": {"id": "4563517e-7086-4af6-97e3-139f0abd1230","name": "Analysis Request Protocol","protocolType": "INSTRUMENT","parameters": {"category": null,"timeout_sec": 3600,"output_types": {},"provision_settings": {}, "optional_parameters": {},"required_parameters": {}}}`,
    settingsData:
      '{"category":"multiscale","timeout_sec":12000,"output_types":[],"provision_settings":{"version":1,"endpoint":"trigger-multiscale","namespace":"prod","provision_type":"pubsub"},"optional_parameters":{"downscale_levels":4},"required_parameters":{"zarr_image":null}}',
  },
  {
    phase: "Clone isolation",
    name: "Zarr Nuclear Inference",
    type: "Instrument",
    id: "d6ca3e8a-a5da-434a-9f46-bddcd62993cf",
    definitionId: "fec6b3c3-3cde-4a6d-83c4-664af6879fb2",
    settingsData:
      '{"plate_type":"Ibidi 96-well Au Mixed","instrument_id":null,"protocol_file":"gs://cell-nas/NAS/ImagingProtocols/ACQ_PROFILE_128.txt","acq_matching_hash":"5881dd16cbd7e88f9de84bf5dc688f4f","moldev_protocol_id":128}',
  },
  {
    phase: "Clone isolation",
    name: "Zarr Colony Tracking",
    type: "Instrument",
    id: "60ac1266-9a79-4da8-9a70-8f7df63b2ca4",
    definitionId: "4563517e-7086-4af6-97e3-139f0abd1230",
    settingsData:
      '{"plate_type": "Ibidi 96-well TC Plate", "instrument_id": null, "protocol_file": "gs://cell-nas/NAS/ImagingProtocols/ACQ_PROFILE_129txt", "acq_matching_hash": "721-d113420d6265a32f5f2fb95d109ef", "moldev_protocol_id": 129}',
  },
  {
    phase: "Clone isolation",
    name: "4x Confluence Detection",
    type: "Seeding",
    id: "b52bf768-474f-434d-9971-6eaddebfa7a4",
    definitionId: "4563517e-7086-4af6-97e3-139f0abd1231",
    settingsData:
      '{"category": "nuc-inference", "timeout_sec": 1200, "output_types": [{"name": "Nuc Inference Mask", "type": "zarr"}], "provision_settings": {"version": 1, "endpoint": "trigger-zarr-nuc-inference-prod", "namespace": "prod", "provision_type": "pubsub"}, "optional_parameters": {"z_indices": [0, 1, 2, 3], "model_name": "sendai_x1356_m2D5_z0_4_8_12"}, "required_parameters": {"well_id": null, "zarr_name": null, "time_index": null, "analysis_protocol_id": null}}',
  },
  {
    phase: "Vector clearance",
    name: "10x Confluence Detection",
    type: "Seeding",
    id: "54b6235f-1ad5-4419-83ab-c713347ee2e9",
    definitionId: "4463517e-7086-4af6-97e3-139f0abd1230",
    settingsData:
      '{"category": "colony-tracking", "timeout_sec": 15000, "output_types": [], "provision_settings": {"version": 1, "endpoint": "trigger-colony-tracking-prod", "namespace": "prod", "provision_type": "pubsub"}, "optional_parameters": {}, "required_parameters": {"well_id": null}}',
  },
  {
    phase: "Vector clearance",
    name: "Finalize Well",
    type: "ML Service",
    id: "3b4e1d8d-7552-4867-b7ce-cd6ed8875a03",
    definitionId: "4573517e-7086-4af6-97e3-139f0abd1230",
    settingsData:
      '{"category": "confluence", "timeout_sec": 600, "output_types": [{"name": "Confluence Mask", "type": "zarr"}], "provision_settings": {"version": 2, "endpoint": "trigger-zarr-4x-conf-prod", "namespace": "prod", "provision_type": "pubsub"}, "optional_parameters": {"z_indices": [0, 1, 2, 3], "model_name": "confl_m10-datver2"}, "required_parameters": {"well_id": null, "zarr_name": null, "time_index": null, "analysis_protocol_id": null}}',
  },
  {
    phase: "Vector clearance",
    name: "Zarr Multiscaling",
    type: "Instrument",
    id: "90ef8694-7073-416e-a17f-233f89001009",
    definitionId: "4563517e-9086-4af6-97e3-139f0abd1230",
    settingsData:
      '{"category": "confluence", "timeout_sec": 600, "output_types": [{"name": "Confluence Mask", "type": "zarr"}], "provision_settings": {"version": 2, "endpoint": "trigger-zarr-4x-conf-prod", "namespace": "prod", "provision_type": "pubsub"}, "optional_parameters": {"z_indices": [2, 4, 6], "model_name": "confl_10x_sendai_m1"}, "required_parameters": {"well_id": null, "zarr_name": null, "time_index": null, "analysis_protocol_id": null}}',
  },
  {
    phase: "Vector clearance",
    name: "Zarr Multiscaling",
    type: "Seeding",
    id: "cf7d26ee-a031-4656-b7ba-e3f64a8e65ea",
    definitionId: "4563537e-7086-4af6-97e3-139f0abd1230",
    settingsData:
      '{"category": "status-update", "timeout_sec": 300, "output_types": [], "provision_settings": {"version": 1, "endpoint": "gcf_finalize_clone_well", "namespace": "prod", "provision_type": "pubsub"}, "optional_parameters": {}, "required_parameters": {"success": true, "well_id": null, "plate_name": null, "well_position": null}}',
  },
];
