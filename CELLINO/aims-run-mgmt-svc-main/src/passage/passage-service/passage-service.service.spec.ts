import tap from "tap";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PassageService } from "./passage-service.service";
import { Plate } from "../../entities/plate.entity";

const passageMock: any = [
  {
    passagenumber: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null],
  },
];

let passageService: PassageService;
const mockedRepoPassage = {
  query: (query: any) => {
    return passageMock;
  },
};

tap.test("test plate service with id", async (t) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PassageService,
      {
        provide: getRepositoryToken(Plate),
        useValue: mockedRepoPassage,
      },
    ],
  }).compile();
  passageService = await module.get(PassageService);
  const passages = await passageService.getPassage();
  t.expectUncaughtException;
});
