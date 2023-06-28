import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { ChannelType } from "../enums/channel-type";
import { MagnificationType } from "../enums/maginification-type";

@Entity()
export class ImageSetting extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false ,unique:true})
  name: string;

  @Column({ name: "channel_type", nullable: true })
  channelType: ChannelType;

  @Column({ name: "magnification", nullable: false })
  magnification: MagnificationType;

  @Column({ name: "colormap", nullable: true })
  colorMap: string;

  @Column({ name: "z_array", type: "double precision", nullable: false })
  zArray: Array<number>;

  @Column({ name: "metadata", type: "jsonb", nullable: true })
  metadata: { [p: string]: unknown };
}
