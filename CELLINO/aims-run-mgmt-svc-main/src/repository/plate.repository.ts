import { Injectable } from "@nestjs/common";
import { Plate } from "../entities/plate.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PlateRepository extends Repository<Plate> {
  constructor(private datasource: DataSource) {
    super(Plate, datasource.createEntityManager());
  }
}
