/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Subscription } from './Subscription';
import type { SubscriptionLocalization } from './SubscriptionLocalization';
export type SubscriptionLocalizationsResponse = {
    data: Array<SubscriptionLocalization>;
    included?: Array<Subscription>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

