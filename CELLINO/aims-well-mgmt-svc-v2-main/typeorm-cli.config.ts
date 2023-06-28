import { Cluster } from "./src/entities/cluster.entity";
import { Colony } from "./src/entities/colony.entity";
import { DataSource } from "typeorm";
import { Well } from "src/entities/well.entity";
import { ImageAnalysisRequest } from "src/entities/image-analysis-request.entity";
import { WellReviewer } from "src/entities/well-reviewer.entity";
import { ImageEvent } from "src/entities/image-event.entity";
import { ImageSetting } from "src/entities/image-setting.entity";
import { ClusterColonyUpdateMigration1666168581959 } from "src/migrations/1666168581959-Migration";
import { AddColorToColony1667312305172 } from "src/migrations/1667312305172-AddColorToColony";
import { AddOutlineToColony1667312252815 } from "src/migrations/1667312252815-AddOutlineToColony";
import { MergeImageEventAndImageEventWell1668073765246 } from "src/migrations/1668073765246-MergeImageEventAndImageEventWell";
import { UniqueConstraintInWell1668502519884 } from "src/migrations/1668502519884-UniqueConstraintInWell";
import { ImageAnalysisRequestInputParameterColumn1669023914173 } from "src/migrations/1669023914173-ImageAnalysisRequest_InputParameterColumn";
import { AlterInferenceNameLength1669033778294 } from "src/migrations/1669033778294-AlterInferenceNameLength";
import { Inference } from "src/entities/inference.entity";
import { AnalysisRequestStatus } from "src/entities/analysis-request-status.entity";
import { CreateAnalysisRequestStatusMigration1669104947722 } from "src/migrations/1669104947722-CreateAnalysisRequestStatusMigration";
import { InsertAnalysisRequestStatusMigration1669104947722 } from "src/migrations/1669104947722-InsertAnalysisRequestStatusMigration";
import { AddAuditFeildsToTimeseries1670492289223 } from "src/migrations/1670492289223-AddAuditFeildsToTimeseries";
import { ImageTimeseries } from "src/entities/image-timeseries.entity";
import { AddIndexingOnTables1671002580676 } from "src/migrations/1671002580676-AddIndexingOnTables";
import { AnalysisRequestStatusMigrationV11669104947722 } from "src/migrations/1669104947722-AnalysisRequestStatusMigrationV1";
import { uniqueAndNotNullConstraints1672847271984 } from "src/migrations/1672847271984-uniqueAndNotNullConstraints";
import { DeleteAttributeLabelMigration1673418475958 } from "src/migrations/1673418475958-DeleteAttributeLabelMigration";
import { AlterImageSettingNameLength1673006246535 } from "src/migrations/1673006246535-AlterImageSettingNameLength";
import { CreateScanObject1675258339778 } from "src/migrations/1675258339778-CreateScanObject";
import { Ancestry } from "src/entities/ancestry.entity";
import { ClusterAttribute } from "src/entities/cluster-attribute.entity";
import { ClusterLineageAttribute } from "src/entities/cluster-lineage-attribute.entity";
import { ClusterLineage } from "src/entities/cluster-lineage.entity";
import { ColonyAttribute } from "src/entities/colony-attribute.entity";
import { ClusterAttributeMigration1675247131245 } from "src/migrations/1675247131245-ClusterAttributeMigration";
import { UpdateImageEvent1675419044518 } from "./src/migrations/1675419044518-update-image-event";
import { UpdateUniqueConstraint1675418279198 } from "./src/migrations/1675418279198-update-unique-constraint";
import { ScanObject } from "src/entities/scan-object.entity";
import { GenerationType } from "src/entities/generation-type.entity";
import { AddIndexesToScanObjectTable1675760386066 } from "src/migrations/1675760386066-AddIndexesToScanObjectTable";
import { AddOriginalIdColumn1676031750308 } from "./src/migrations/1676031750308-add-original-id-column";
import { AddIndexesToClusterArtifactTable1678760386066 } from "src/migrations/1678760386066-add-indexes-to-cluster";
import { ChannelType1677243669822 } from "src/migrations/1677243669822-channel-type";
import { AddIsBaseImageToImageEvent1677496320905 } from "src/migrations/1677496320905-add-is-base-image-to-image-event";
import { Finding } from "src/entities/finding.entity";
import { FindingTableCreation1678876303374 } from "src/migrations/1678876303374-finding-table-creation";
import { Tag } from "src/entities/tag.entity";
import { FindingTag } from "src/entities/finding-tag.entity";
import { TagTableCreation1678961203420 } from "src/migrations/1678961203420-tag-table-creation";
import { FindingTagTableCreation1679232246990 } from "src/migrations/1679232246990-finding-tag-table-creation";

export default new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Cluster,
    Colony,
    Well,
    ImageAnalysisRequest,
    WellReviewer,
    ImageEvent,
    ImageSetting,
    Inference,
    ImageAnalysisRequest,
    AnalysisRequestStatus,
    ImageTimeseries,
    Ancestry,
    ClusterAttribute,
    ClusterLineageAttribute,
    ClusterLineage,
    ColonyAttribute,
    ScanObject,
    GenerationType,
    Finding,
    Tag,
    FindingTag
  ],

  migrations: [
    ClusterColonyUpdateMigration1666168581959,
    AddColorToColony1667312305172,
    AddOutlineToColony1667312252815,
    MergeImageEventAndImageEventWell1668073765246,
    UniqueConstraintInWell1668502519884,
    ImageAnalysisRequestInputParameterColumn1669023914173,
    AlterInferenceNameLength1669033778294,
    CreateAnalysisRequestStatusMigration1669104947722,
    InsertAnalysisRequestStatusMigration1669104947722,
    AddAuditFeildsToTimeseries1670492289223,
    AddIndexingOnTables1671002580676,
    AnalysisRequestStatusMigrationV11669104947722,
    uniqueAndNotNullConstraints1672847271984,
    DeleteAttributeLabelMigration1673418475958,
    AlterImageSettingNameLength1673006246535,
    CreateScanObject1675258339778,
    ClusterAttributeMigration1675247131245,
    UpdateUniqueConstraint1675418279198,
    UpdateImageEvent1675419044518,
    AddIndexesToScanObjectTable1675760386066,
    AddOriginalIdColumn1676031750308,
    AddIndexesToClusterArtifactTable1678760386066,
    ChannelType1677243669822,
    AddIsBaseImageToImageEvent1677496320905,
    FindingTableCreation1678876303374,
    TagTableCreation1678961203420,
    FindingTagTableCreation1679232246990
  ],
});

//for migration need to run the below command: npx env-cmd -f .env typeorm migration:run -d dist/typeorm-cli.config
