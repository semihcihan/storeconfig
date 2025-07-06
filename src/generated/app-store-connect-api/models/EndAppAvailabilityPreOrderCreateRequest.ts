/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EndAppAvailabilityPreOrderCreateRequest = {
    data: {
        type: EndAppAvailabilityPreOrderCreateRequest.type;
        relationships: {
            territoryAvailabilities: {
                data: Array<{
                    type: 'territoryAvailabilities';
                    id: string;
                }>;
            };
        };
    };
};
export namespace EndAppAvailabilityPreOrderCreateRequest {
    export enum type {
        END_APP_AVAILABILITY_PRE_ORDERS = 'endAppAvailabilityPreOrders',
    }
}

