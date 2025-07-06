/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaBuildUsagesV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                crashCount?: number;
                installCount?: number;
                sessionCount?: number;
                feedbackCount?: number;
                inviteCount?: number;
            };
        };
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

