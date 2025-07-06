/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TerritoryAvailabilityUpdateRequest = {
    data: {
        type: TerritoryAvailabilityUpdateRequest.type;
        id: string;
        attributes?: {
            available?: boolean;
            releaseDate?: string;
            preOrderEnabled?: boolean;
        };
    };
};
export namespace TerritoryAvailabilityUpdateRequest {
    export enum type {
        TERRITORY_AVAILABILITIES = 'territoryAvailabilities',
    }
}

