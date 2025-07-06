/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterMatchmakingSessionsV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                count?: number;
                averagePlayerCount?: number;
                p50PlayerCount?: number;
                p95PlayerCount?: number;
            };
        };
        granularity?: 'P1D' | 'PT1H' | 'PT15M';
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

