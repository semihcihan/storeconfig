/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { SubscriptionGroup } from './SubscriptionGroup';
import type { SubscriptionGroupLocalization } from './SubscriptionGroupLocalization';
export type SubscriptionGroupLocalizationsResponse = {
    data: Array<SubscriptionGroupLocalization>;
    included?: Array<SubscriptionGroup>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

