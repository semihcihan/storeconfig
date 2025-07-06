/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchaseAvailability } from './InAppPurchaseAvailability';
import type { Territory } from './Territory';
export type InAppPurchaseAvailabilityResponse = {
    data: InAppPurchaseAvailability;
    included?: Array<Territory>;
    links: DocumentLinks;
};

