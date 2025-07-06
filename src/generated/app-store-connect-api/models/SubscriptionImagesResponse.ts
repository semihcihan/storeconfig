/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Subscription } from './Subscription';
import type { SubscriptionImage } from './SubscriptionImage';
export type SubscriptionImagesResponse = {
    data: Array<SubscriptionImage>;
    included?: Array<Subscription>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

