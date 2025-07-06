/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { SubscriptionPrice } from './SubscriptionPrice';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
export type SubscriptionPriceResponse = {
    data: SubscriptionPrice;
    included?: Array<(Territory | SubscriptionPricePoint)>;
    links: DocumentLinks;
};

