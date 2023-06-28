import { Column, Entity,JoinTable,ManyToMany,OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { WorkflowPhase } from "./workflow-phase.entity";
import { PhaseProtocol } from "./phase-protocol.entity";

@Entity()
@Unique(['name', 'version'])
export class Phase extends BaseEntity{ 
    
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column({name:"name",nullable:false})
    name:string;

    @Column({name:"version",nullable:false})
    version:number;

    @Column({name:"order",nullable:true})
    order:number;

    @Column({name:"description",nullable:true,type:"text"})
    description:string;

    @Column({name:"phase_initiation_rules",nullable:false,type:"jsonb"})
    phaseInitiationRules:Map<String,Object>[]; 
    
    @Column({name:"other_rules",nullable:true,type:"jsonb"})
    otherRules:Map<String,Object>[];
    
    @OneToMany(() => WorkflowPhase, workflowPhase => workflowPhase.phase)
    workflowToPhase: WorkflowPhase[];

    @JoinTable({ name: "phase_protocol" })
    @OneToMany(() => PhaseProtocol, (protocol) => protocol.phase, {
      cascade: true,
    })
    phaseToProtocol: PhaseProtocol[];
    @Column({name:"is_active",default:true})
    isActive:boolean;
}