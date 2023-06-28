import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ImageAnalysisRequestInputParameterColumn1669023914173
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "image_analysis_request",
      new TableColumn({
        name: "input_parameters",
        type: "jsonb",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("image_analysis_request", "input_parameters");
  }
}
