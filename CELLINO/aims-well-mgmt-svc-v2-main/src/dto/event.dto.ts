export class EventDto {
  readonly id: string;
  readonly name: string;
  readonly metadata: { [p: string]: unknown };
}
