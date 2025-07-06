/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
export type SubscriptionPricePointsResponse = {
    data: Array<SubscriptionPricePoint>;
    included?: Array<Territory>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

