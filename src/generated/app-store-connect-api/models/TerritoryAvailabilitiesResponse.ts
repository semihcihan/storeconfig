/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Territory } from './Territory';
import type { TerritoryAvailability } from './TerritoryAvailability';
export type TerritoryAvailabilitiesResponse = {
    data: Array<TerritoryAvailability>;
    included?: Array<Territory>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

