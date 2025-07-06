/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AnalyticsReportSegment = {
    type: AnalyticsReportSegment.type;
    id: string;
    attributes?: {
        checksum?: string;
        sizeInBytes?: number;
        url?: string;
    };
    links?: ResourceLinks;
};
export namespace AnalyticsReportSegment {
    export enum type {
        ANALYTICS_REPORT_SEGMENTS = 'analyticsReportSegments',
    }
}

