/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
export type SubscriptionPricePointResponse = {
    data: SubscriptionPricePoint;
    included?: Array<Territory>;
    links: DocumentLinks;
};

