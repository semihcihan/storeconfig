/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
import type { PromotedPurchase } from './PromotedPurchase';
import type { Subscription } from './Subscription';
export type PromotedPurchaseResponse = {
    data: PromotedPurchase;
    included?: Array<(InAppPurchaseV2 | Subscription)>;
    links: DocumentLinks;
};

