/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RoutingAppCoverageCreateRequest = {
    data: {
        type: RoutingAppCoverageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            appStoreVersion: {
                data: {
                    type: RoutingAppCoverageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace RoutingAppCoverageCreateRequest {
    export enum type {
        ROUTING_APP_COVERAGES = 'routingAppCoverages',
    }
}

