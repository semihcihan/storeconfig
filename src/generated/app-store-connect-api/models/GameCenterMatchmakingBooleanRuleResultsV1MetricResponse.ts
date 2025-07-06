/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterMatchmakingBooleanRuleResultsV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                count?: number;
            };
        };
        dimensions?: {
            result?: {
                links?: {
                    groupBy?: string;
                };
                data?: string;
            };
            gameCenterMatchmakingQueue?: {
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

