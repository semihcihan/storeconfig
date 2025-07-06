/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AnalyticsReportRequest = {
    type: AnalyticsReportRequest.type;
    id: string;
    attributes?: {
        accessType?: AnalyticsReportRequest.accessType;
        stoppedDueToInactivity?: boolean;
    };
    relationships?: {
        reports?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'analyticsReports';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AnalyticsReportRequest {
    export enum type {
        ANALYTICS_REPORT_REQUESTS = 'analyticsReportRequests',
    }
    export enum accessType {
        ONE_TIME_SNAPSHOT = 'ONE_TIME_SNAPSHOT',
        ONGOING = 'ONGOING',
    }
}

