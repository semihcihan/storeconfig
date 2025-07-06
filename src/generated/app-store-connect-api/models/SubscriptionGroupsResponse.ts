/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Subscription } from './Subscription';
import type { SubscriptionGroup } from './SubscriptionGroup';
import type { SubscriptionGroupLocalization } from './SubscriptionGroupLocalization';
export type SubscriptionGroupsResponse = {
    data: Array<SubscriptionGroup>;
    included?: Array<(Subscription | SubscriptionGroupLocalization)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

