export class MlAnalysisRequestPayloadDto {
  id: string;
  name: string;
  started_at: Date;
  status: string;
  protocol_id: string;
  image_event_id: string;
  biosero_order_identifier: string;
  is_developer_mode: boolean;
  well_position: string;
  plate_barcode: string;
  input_parameters: { [p: string]: unknown };
}
