/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AnalyticsReportInstance = {
    type: AnalyticsReportInstance.type;
    id: string;
    attributes?: {
        granularity?: AnalyticsReportInstance.granularity;
        processingDate?: string;
    };
    relationships?: {
        segments?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace AnalyticsReportInstance {
    export enum type {
        ANALYTICS_REPORT_INSTANCES = 'analyticsReportInstances',
    }
    export enum granularity {
        DAILY = 'DAILY',
        WEEKLY = 'WEEKLY',
        MONTHLY = 'MONTHLY',
    }
}

