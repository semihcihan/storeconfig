/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsReport } from './AnalyticsReport';
import type { AnalyticsReportRequest } from './AnalyticsReportRequest';
import type { DocumentLinks } from './DocumentLinks';
export type AnalyticsReportRequestResponse = {
    data: AnalyticsReportRequest;
    included?: Array<AnalyticsReport>;
    links: DocumentLinks;
};

