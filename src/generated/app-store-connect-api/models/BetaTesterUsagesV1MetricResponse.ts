/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaTesterUsagesV1MetricResponse = {
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
            apps?: {
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
};

