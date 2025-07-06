/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { Territory } from './Territory';
import type { TerritoryAvailability } from './TerritoryAvailability';
export type TerritoryAvailabilityResponse = {
    data: TerritoryAvailability;
    included?: Array<Territory>;
    links: DocumentLinks;
};

