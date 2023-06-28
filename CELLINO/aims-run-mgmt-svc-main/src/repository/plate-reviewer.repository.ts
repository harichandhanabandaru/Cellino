import { PlateReviewer } from "../entities/plate-reviewer.entity";
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PlateRepository } from "./plate.repository";

@Injectable()
export class PlateReviewerRepository extends Repository<PlateReviewer> {
  constructor(private datasource: DataSource) {
    super(PlateReviewer, datasource.createEntityManager());
  }

  async findAllPlatesGroupByUserAndCount({
    plateRepository,
    limit,
    offset,
  }: {
    plateRepository: PlateRepository;
    limit: number;
    offset: number;
  }): Promise<[PlateReviewer[], number]> {
    const query = this.createQueryBuilder("pr")
      .select(["user_id"])
      .addSelect('count(plate_id) as "count"')
      .groupBy("user_id")
      .orderBy("count", "DESC");

    if (limit !== undefined) query.limit(limit);
    if (offset !== undefined) query.offset(offset);

    const countQuery = await this.createQueryBuilder("pr")
      .select("count(distinct user_id)")
      .getRawOne();
    const data = await query.getRawMany();

    // TODO: Below promise.all code needs to be refactored. It is not upto standards
    const response = Promise.all(
      data.map(async (ele) => {
        const plates = await plateRepository.find({
          where: { reviewers: { userId: ele["user_id"] } },
          relations: { run: true },
        });
        ele.plates = plates;
        return ele;
      })
    );

    // TODO: refactor the code below. why Promise.resolve??
    return Promise.resolve([await response, +countQuery?.count]);
  }
}
