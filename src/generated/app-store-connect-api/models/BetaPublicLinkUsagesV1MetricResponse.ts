/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaPublicLinkUsagesV1MetricResponse = {
    data: Array<{
        dataPoints?: {
            start?: string;
            end?: string;
            values?: {
                viewCount?: number;
                acceptedCount?: number;
                didNotAcceptCount?: number;
                didNotMeetCriteriaCount?: number;
                notRelevantRatio?: number;
                notClearRatio?: number;
                notInterestingRatio?: number;
            };
        };
    }>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

