/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type RoutingAppCoverage = {
    type: RoutingAppCoverage.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    relationships?: {
        appStoreVersion?: {
            data?: {
                type: RoutingAppCoverage.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace RoutingAppCoverage {
    export enum type {
        ROUTING_APP_COVERAGES = 'routingAppCoverages',
    }
}

