/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaTester } from './BetaTester';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppsBetaTesterUsagesV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                crashCount?: number;
                sessionCount?: number;
                feedbackCount?: number;
            };
        };
        dimensions?: {
            betaTesters?: {
                links?: {
                    groupBy?: string;
                    related?: string;
                };
                data?: string;
            };
        };
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
    included?: Array<BetaTester>;
};

