/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type PerfPowerMetric = {
    type: PerfPowerMetric.type;
    id: string;
    attributes?: {
        platform?: PerfPowerMetric.platform;
        metricType?: PerfPowerMetric.metricType;
        deviceType?: string;
    };
    links?: ResourceLinks;
};
export namespace PerfPowerMetric {
    export enum type {
        PERF_POWER_METRICS = 'perfPowerMetrics',
    }
    export enum platform {
        IOS = 'IOS',
    }
    export enum metricType {
        DISK = 'DISK',
        HANG = 'HANG',
        BATTERY = 'BATTERY',
        LAUNCH = 'LAUNCH',
        MEMORY = 'MEMORY',
        ANIMATION = 'ANIMATION',
        TERMINATION = 'TERMINATION',
    }
}

