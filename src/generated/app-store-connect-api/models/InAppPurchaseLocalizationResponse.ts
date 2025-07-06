/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchaseLocalization } from './InAppPurchaseLocalization';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
export type InAppPurchaseLocalizationResponse = {
    data: InAppPurchaseLocalization;
    included?: Array<InAppPurchaseV2>;
    links: DocumentLinks;
};

