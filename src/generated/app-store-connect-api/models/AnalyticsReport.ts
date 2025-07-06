/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AnalyticsReport = {
    type: AnalyticsReport.type;
    id: string;
    attributes?: {
        name?: string;
        category?: AnalyticsReport.category;
    };
    relationships?: {
        instances?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace AnalyticsReport {
    export enum type {
        ANALYTICS_REPORTS = 'analyticsReports',
    }
    export enum category {
        APP_USAGE = 'APP_USAGE',
        APP_STORE_ENGAGEMENT = 'APP_STORE_ENGAGEMENT',
        COMMERCE = 'COMMERCE',
        FRAMEWORK_USAGE = 'FRAMEWORK_USAGE',
        PERFORMANCE = 'PERFORMANCE',
    }
}

