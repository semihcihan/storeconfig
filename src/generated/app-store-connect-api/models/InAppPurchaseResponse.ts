/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchase } from './InAppPurchase';
/**
 * @deprecated
 */
export type InAppPurchaseResponse = {
    data: InAppPurchase;
    included?: Array<App>;
    links: DocumentLinks;
};

