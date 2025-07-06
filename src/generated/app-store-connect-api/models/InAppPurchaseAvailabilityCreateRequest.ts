/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseAvailabilityCreateRequest = {
    data: {
        type: InAppPurchaseAvailabilityCreateRequest.type;
        attributes: {
            availableInNewTerritories: boolean;
        };
        relationships: {
            inAppPurchase: {
                data: {
                    type: InAppPurchaseAvailabilityCreateRequest.type;
                    id: string;
                };
            };
            availableTerritories: {
                data: Array<{
                    type: 'territories';
                    id: string;
                }>;
            };
        };
    };
};
export namespace InAppPurchaseAvailabilityCreateRequest {
    export enum type {
        IN_APP_PURCHASE_AVAILABILITIES = 'inAppPurchaseAvailabilities',
    }
}

