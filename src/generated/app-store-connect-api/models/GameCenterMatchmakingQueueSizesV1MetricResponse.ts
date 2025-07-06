/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterMatchmakingQueueSizesV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                count?: number;
                averageNumberOfRequests?: number;
                p50NumberOfRequests?: number;
                p95NumberOfRequests?: number;
            };
        };
        granularity?: 'P1D' | 'PT1H' | 'PT15M';
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

