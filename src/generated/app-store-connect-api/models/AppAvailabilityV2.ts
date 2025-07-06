/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppAvailabilityV2 = {
    type: AppAvailabilityV2.type;
    id: string;
    attributes?: {
        availableInNewTerritories?: boolean;
    };
    relationships?: {
        territoryAvailabilities?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'territoryAvailabilities';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppAvailabilityV2 {
    export enum type {
        APP_AVAILABILITIES = 'appAvailabilities',
    }
}

