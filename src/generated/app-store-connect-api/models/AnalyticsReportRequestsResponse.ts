/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsReport } from './AnalyticsReport';
import type { AnalyticsReportRequest } from './AnalyticsReportRequest';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AnalyticsReportRequestsResponse = {
    data: Array<AnalyticsReportRequest>;
    included?: Array<AnalyticsReport>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

