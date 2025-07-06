/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterMatchmakingQueueRequestsV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                count?: number;
                averageSecondsInQueue?: number;
                p50SecondsInQueue?: number;
                p95SecondsInQueue?: number;
            };
        };
        dimensions?: {
            result?: {
                links?: {
                    groupBy?: string;
                };
                data?: 'MATCHED' | 'CANCELED' | 'EXPIRED';
            };
            gameCenterDetail?: {
                links?: {
                    groupBy?: string;
                    related?: string;
                };
                data?: string;
            };
        };
        granularity?: 'P1D' | 'PT1H' | 'PT15M';
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

