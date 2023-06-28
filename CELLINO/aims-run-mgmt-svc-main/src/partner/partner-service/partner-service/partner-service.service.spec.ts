import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { PartnerDTO } from "../../../dto/partner.dto";
import { Partner } from "../../../entities/partner.entity";
import tap from "tap";
import { PartnerService } from "./partner-service.service";

const mock = [plainToClass(Partner,
  {
    id: 'aa6fd36d-f78d-11ec-9674-5d27ec1cd472',
    name: 'partner-1',
    type : 'PARTNER'
  }
)] 
const mockedRepo = {find : (id:any) => {return mock}}
let partnerService:PartnerService;

tap.test('test partner service with id list ', async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PartnerService,
      {
        provide: getRepositoryToken(Partner),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  partnerService = await module.get(PartnerService);
  const partners:PartnerDTO[] = await partnerService.getPartners(["2cfc0774-f78e-11ec-9674-5d27ec1cd472"])
  t.equal(partners.length,1);
});
