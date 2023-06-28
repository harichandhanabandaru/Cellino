import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartnerDTO } from "../../../dto/partner.dto";
import { Partner } from "../../../entities/partner.entity";
import { PartnerType } from "../../../enums/PartnerType";
import { In, Repository } from "typeorm";

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>
  ) {}

  async getPartners(ids: string[]): Promise<PartnerDTO[]> {
    const partners: Partner[] = await this.partnerRepository.find({
      where: { id: In(ids) },
      relations: { runs: true },
    });
    const partnerDtoList: PartnerDTO[] = [];
    partners.forEach((partner) => {
      partnerDtoList.push(this.convertEntityToDto(partner));
    });
    return partnerDtoList;
  }

  convertEntityToDto(partner: Partner): PartnerDTO {
    const partnerDto = new PartnerDTO();
    partnerDto.id = partner.id;
    partnerDto.name = partner.name;
    partnerDto.type =
      PartnerType[partner.type as undefined as keyof typeof PartnerType];
    return partnerDto;
  }

  async getPartnerById(id: string) {
    return await this.partnerRepository.findOneOrFail({
      where: { id },
    });
  }
}
