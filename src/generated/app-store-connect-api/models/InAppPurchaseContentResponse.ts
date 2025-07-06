/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchaseContent } from './InAppPurchaseContent';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
export type InAppPurchaseContentResponse = {
    data: InAppPurchaseContent;
    included?: Array<InAppPurchaseV2>;
    links: DocumentLinks;
};

