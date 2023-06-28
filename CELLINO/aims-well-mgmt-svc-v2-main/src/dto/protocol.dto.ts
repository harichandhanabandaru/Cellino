export class ProtocolDto {
  readonly id: string;
  readonly name: string;
  readonly settings: { [p: string]: unknown };
}
