/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppAvailabilityV2 } from './AppAvailabilityV2';
import type { DocumentLinks } from './DocumentLinks';
import type { TerritoryAvailability } from './TerritoryAvailability';
export type AppAvailabilityV2Response = {
    data: AppAvailabilityV2;
    included?: Array<TerritoryAvailability>;
    links: DocumentLinks;
};

