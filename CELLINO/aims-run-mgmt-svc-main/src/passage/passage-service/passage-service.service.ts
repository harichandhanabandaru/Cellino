import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Plate } from "../../entities/plate.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PassageService {
  static DEFAULT_SIZE: number = 20;
  static DEFAULT_PAGE: number = 0;

  constructor(
    @InjectRepository(Plate)
    private readonly plateRepository: Repository<Plate>
  ) {}

  async getPassage(): Promise<[Number]> {
    let response;

    response = await this.plateRepository.query(
      "select array_agg(distinct process_metadata->>'passage_number') as passageNumber from plate;"
    );
    response[0]["passagenumber"] = response[0]["passagenumber"].filter(
      (i) => i !== null
    );
    if (response) return response[0];
    else throw new NotFoundException(`Could not fetch passage details`);
  }
}
