/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AnalyticsReportRequestCreateRequest = {
    data: {
        type: AnalyticsReportRequestCreateRequest.type;
        attributes: {
            accessType: AnalyticsReportRequestCreateRequest.accessType;
        };
        relationships: {
            app: {
                data: {
                    type: AnalyticsReportRequestCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AnalyticsReportRequestCreateRequest {
    export enum type {
        ANALYTICS_REPORT_REQUESTS = 'analyticsReportRequests',
    }
    export enum accessType {
        ONE_TIME_SNAPSHOT = 'ONE_TIME_SNAPSHOT',
        ONGOING = 'ONGOING',
    }
}

