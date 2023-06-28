export class GetWellRequestDTO {
  plateId: string;
  wellPosition: string;
  constructor(plateId?: string, wellPosition?: string) {
    this.plateId = plateId;
    this.wellPosition = wellPosition;
  }
}
