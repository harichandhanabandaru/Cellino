import { RunMetric } from '../entities/run-metric.entity';

export class RunMetricDTO {
    runId: String;
    originalPlateCount: number;
    originalWellCount: number;
    platesCount: number;
    wellsCount: number;
    activePlatesCount: number;
    activeWellsCount: number;

    constructor(metric: RunMetric) {
        this.runId              = metric.runId;
        this.wellsCount         = metric.wellsCount;
        this.platesCount        = metric.platesCount;
        this.activePlatesCount  = metric.activePlatesCount;
        this.activeWellsCount   = metric.activeWellsCount;
        this.originalPlateCount = metric.originalPlateCount;
        this.originalWellCount  = metric.originalWellCount;
    }
}