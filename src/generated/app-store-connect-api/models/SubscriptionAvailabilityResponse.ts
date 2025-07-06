/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { SubscriptionAvailability } from './SubscriptionAvailability';
import type { Territory } from './Territory';
export type SubscriptionAvailabilityResponse = {
    data: SubscriptionAvailability;
    included?: Array<Territory>;
    links: DocumentLinks;
};

