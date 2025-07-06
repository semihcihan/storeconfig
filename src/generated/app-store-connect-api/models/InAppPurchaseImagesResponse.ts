/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InAppPurchaseImage } from './InAppPurchaseImage';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type InAppPurchaseImagesResponse = {
    data: Array<InAppPurchaseImage>;
    included?: Array<InAppPurchaseV2>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

