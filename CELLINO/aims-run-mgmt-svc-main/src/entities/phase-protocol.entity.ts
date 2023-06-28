import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Phase } from "./phase.entity";
import { Protocol } from "./protocol.entity";

@Entity({ name: "phase_protocol" })
export class PhaseProtocol {

    @PrimaryColumn({ name: "phase_id" })
    phaseId: string;

    @PrimaryColumn({ name: "protocol_id" })
    protocolId: string;

    @ManyToOne(() => Protocol, (pre) => pre.id)
    @JoinColumn({ name: "preceding_protocol_id" })
    precedingProtocol: Protocol;

    @ManyToOne(() => Phase, phase => phase.phaseToProtocol, { eager: true })
    @JoinColumn({ name: "phase_id" })
    phase: Phase;

    @ManyToOne(() => Protocol, protocol => protocol.phaseProtocol, { eager: true })
    @JoinColumn({ name: "protocol_id" })
    protocol: Protocol;
}