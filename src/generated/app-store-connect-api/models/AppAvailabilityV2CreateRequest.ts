/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TerritoryAvailabilityInlineCreate } from './TerritoryAvailabilityInlineCreate';
export type AppAvailabilityV2CreateRequest = {
    data: {
        type: AppAvailabilityV2CreateRequest.type;
        attributes: {
            availableInNewTerritories: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: AppAvailabilityV2CreateRequest.type;
                    id: string;
                };
            };
            territoryAvailabilities: {
                data: Array<{
                    type: 'territoryAvailabilities';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<TerritoryAvailabilityInlineCreate>;
};
export namespace AppAvailabilityV2CreateRequest {
    export enum type {
        APP_AVAILABILITIES = 'appAvailabilities',
    }
}

