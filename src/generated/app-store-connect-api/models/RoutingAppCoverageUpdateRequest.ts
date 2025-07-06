/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RoutingAppCoverageUpdateRequest = {
    data: {
        type: RoutingAppCoverageUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace RoutingAppCoverageUpdateRequest {
    export enum type {
        ROUTING_APP_COVERAGES = 'routingAppCoverages',
    }
}

