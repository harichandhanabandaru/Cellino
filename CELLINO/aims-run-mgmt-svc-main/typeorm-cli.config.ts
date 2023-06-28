import { BioseroTracker } from "src/entities/biosero-tracker.entity";
import { Migration1663058805899 } from "src/migrations/1663058805899-Migration";
import { BioseroTracker1668515116769 } from "src/migrations/1668515116769--BioseroTracker-Migration";
import { BioseroNotificationEventMigration1667325254816 } from "src/migrations/BioseroNotificationEventMigration1667325254816";
import { DataSource } from "typeorm";
import { Event } from "./src/entities/event.entity";
import { Labware } from "./src/entities/labware.entity";
import { Manufacturer } from "./src/entities/manufacturer.entity";
import { Partner } from "./src/entities/partner.entity";
import { Phase } from "./src/entities/phase.entity";
import { Plate } from "./src/entities/plate.entity";
import { Protocol } from "./src/entities/protocol.entity";
import { Run } from "./src/entities/run.entity";
import { Vendor } from "./src/entities/vendor.entity";
import { Workflow } from "./src/entities/workflow.entity";
import { WorkflowPhase } from "src/entities/workflow-phase.entity";
import { ProtocolDefinition } from "src/entities/protocol-definition.entity";
import { Instrument } from "src/entities/instrument.entity";
import { RunMetric } from "src/entities/run-metric.entity";
import { PhaseProtocol } from "src/entities/phase-protocol.entity";
import { CreateTablesSchema1660744811444 } from "src/migrations/1660744811444-CreateTablesSchema";
import { ProtocolDefinition1660801925368 } from "src/migrations/1660801925368-ProtocolDefinition";
import { RunReviewer } from "src/entities/run-reviewer.entity";
import { RunReviewerSync1661160954405 } from "src/migrations/1661160954405-RunReviewerSync";
import { PlateReviewer } from "src/entities/plate-reviewer.entity";
import { workflowPhaseMigration1661248827395 } from "src/migrations/1661248827395-workflowPhaseMigration";
import { workflowPhaseMigration11661265141121 } from "src/migrations/1661265141121-workflowPhaseMigration1";
import { PhaseProtocol1660817536778 } from "src/migrations/1660817536778-PhaseProtocolSync";
import { runPhaseIdUpdateMigration1663158844368 } from "src/migrations/1663158844368-runPhaseIdUpdateMigration";
import { runMetricTriggerMigration1663677568979 } from "src/migrations/1663677568979-runMetricTriggerMigration";
import { CreatedByTypeChanges1663921019238 } from "src/migrations/1663921019238-CreatedByTypeChanges";
import { DropModifiedByFromRunMetric1664189010195 } from "src/migrations/1664189010195-DropModifiedByFromRunMetric";
import { MakeBaseEntityNotNull1664463158306 } from "src/migrations/1664463158306-MakeBaseEntityNotNull";
import { BioseroOrder } from "src/entities/biosero-order.entity";
import { BioseroOrderType } from "src/entities/biosero-order-type.entity";
import { Migration1666805402157 } from "src/migrations/1666805402157-Migration";
import { ProtocolType } from "src/entities/protocol-type.entity";
import { ProtocolTypeMigration1667218585473 } from "src/migrations/1667218585473-ProtocolTypeMigration1";
import { UpdateProtocolMigration1668073998935 } from "src/migrations/1668073998935-ProtocolUpdateMigration";
import { InsertProtocolTypeMigration1667554187351 } from "src/migrations/1667554187351-InsertProtocolTypeMigration";
import { BioseroOrderMigration1668074577320 } from "src/migrations/1668074577320-BioseroOrderMigration";
import { MLDeploymentProtocolType1669022416797 } from "src/migrations/1669022416797-ML_DEPLOYMENT_Protocol_Type";
import { UpdateBioseroOrderSchema1669040397143 } from "src/migrations/1669040397143-UpdateBioseroOrderSchema";
import { InsertTypeOfBioseroOrder1669045750401 } from "src/migrations/1669045750401-InsertTypeOfBioseroOrder";
import { ProtocolCategory } from "src/entities/protocol-category.entity";
import { UpdateProtocolDefinitionMigrationV11669196406583 } from "src/migrations/1669196406583-UpdateProtocolDefinitionMigrationV1";
import { AddImageSourceColumnToBioseroOrder1669702596368 } from "src/migrations/1669702596368-AddImageSourceColumnToBioseroOrder";
import { MakePlateNameAndBarcodeUnique1670652774249 } from "src/migrations/1670652774249-MakePlateNameAndBarcodeUnique";
import { UpdateProtocolDefinitionMigrationV21669196406583 } from "src/migrations/1669196406583-UpdateProtocolDefinitionMigrationV2";
import { AnaylsisService1669109075920 } from "src/migrations/1669185440795-CreateAnalysisService";
import { MergePlateEventAndEvent1669378355120 } from "src/migrations/1669378355120-MergePlateEventAndEvent";
import { DeleteBioseroNotificationEvents1671714231732 } from "src/migrations/1671714231732-Migration";
import { UniqueConstraintsMigration1672724468894 } from "src/migrations/1672724468894-UniqueConstraintsMigration";
import { NotNullConstraintsMigration1672812027541 } from "src/migrations/1672812027541-NotNullConstraintsMigration";
import { DeleteAnalysisServiceTable1672829636704 } from "src/migrations/1672829636704-DeleteAnalysisServiceTable";
import { RunPlateTableCreation1672829636712 } from "src/migrations/1672829636712-RunPlateTableCreation";
import { RunPlate } from "src/entities/run-plate.entity";
import { RunUniqueConstraintsMigration1672724468894 } from "src/migrations/1672724468894-RunUniqueConstraintsMigration";
import { UpdatePlateReviewer1675407646154 } from "src/migrations/1675407646154-UpdatePlateReviewerEntity";
import { AddManualProtocolForScanObject1675435890971 } from "./src/migrations/1675435890971-add-manual-protocol-for-scan-object";
import { ObjectCachingRule } from "src/entities/object-caching-rule.entity";
import { ObjectCachingRule1675272571106 } from "src/migrations/1675272571106-Migration";
import { setDefaultsProtocolCategoryV1676419600516 } from "src/migrations/1676419600516-set-defaults-protocol-category";
import { addNewProtocolCategoryV1676427059949 } from "src/migrations/1676427059949-add-new-protocol-category";
import { ObjectCachingRules1677494918395 } from "src/migrations/object-caching-rules-1677494918395-Migration";
import { ObjectCachingRulesMigration1677749781628 } from "src/migrations/object-caching-rules-1677749781628-migration";
import { AddManualProtocolForFindingObject1679298585420 } from "src/migrations/1679298585420-add-manual-protocol-for-finding-object";

export default new DataSource({
  type: "postgres",
  entities: [
    Event,
    Labware,
    Manufacturer,
    Partner,
    Phase,
    Plate,
    Protocol,
    Run,
    Vendor,
    Workflow,
    WorkflowPhase,
    ProtocolDefinition,
    Instrument,
    RunMetric,
    RunReviewer,
    PlateReviewer,
    PhaseProtocol,
    BioseroOrder,
    BioseroOrderType,
    ProtocolType,
    BioseroTracker,
    ProtocolCategory,
    RunPlate,
    ObjectCachingRule,
  ],
  replication: {
    master: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    slaves: [{
      host: process.env.READ_ONLY_DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }]
  },

  migrations: [
    CreateTablesSchema1660744811444,
    ProtocolDefinition1660801925368,
    RunReviewerSync1661160954405,
    workflowPhaseMigration1661248827395,
    workflowPhaseMigration11661265141121,
    MakeBaseEntityNotNull1664463158306,
    PhaseProtocol1660817536778,
    Migration1663058805899,
    runMetricTriggerMigration1663677568979,
    CreatedByTypeChanges1663921019238,
    DropModifiedByFromRunMetric1664189010195,
    Migration1666805402157,
    runPhaseIdUpdateMigration1663158844368,
    ProtocolTypeMigration1667218585473,
    BioseroNotificationEventMigration1667325254816,
    UpdateProtocolMigration1668073998935,
    InsertProtocolTypeMigration1667554187351,
    BioseroOrderMigration1668074577320,
    BioseroTracker1668515116769,
    MLDeploymentProtocolType1669022416797,
    UpdateBioseroOrderSchema1669040397143,
    InsertTypeOfBioseroOrder1669045750401,
    UpdateProtocolDefinitionMigrationV11669196406583,
    AddImageSourceColumnToBioseroOrder1669702596368,
    MakePlateNameAndBarcodeUnique1670652774249,
    UpdateProtocolDefinitionMigrationV21669196406583,
    AnaylsisService1669109075920,
    MergePlateEventAndEvent1669378355120,
    DeleteBioseroNotificationEvents1671714231732,
    UniqueConstraintsMigration1672724468894,
    NotNullConstraintsMigration1672812027541,
    DeleteAnalysisServiceTable1672829636704,
    RunPlateTableCreation1672829636712,
    RunUniqueConstraintsMigration1672724468894,
    AddManualProtocolForScanObject1675435890971,
    UpdatePlateReviewer1675407646154,
    ObjectCachingRule1675272571106,
    setDefaultsProtocolCategoryV1676419600516,
    addNewProtocolCategoryV1676427059949,
    ObjectCachingRules1677494918395,
    ObjectCachingRulesMigration1677749781628,
    AddManualProtocolForFindingObject1679298585420,
  ],
});
//for migration need to run the below command: npx env-cmd -f .env typeorm migration:run -d dist/typeorm-cli.config
