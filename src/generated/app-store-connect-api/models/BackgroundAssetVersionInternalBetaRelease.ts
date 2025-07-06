/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type BackgroundAssetVersionInternalBetaRelease = {
    type: BackgroundAssetVersionInternalBetaRelease.type;
    id: string;
    attributes?: {
        state?: BackgroundAssetVersionInternalBetaRelease.state;
    };
    relationships?: {
        backgroundAssetVersion?: {
            data?: {
                type: BackgroundAssetVersionInternalBetaRelease.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BackgroundAssetVersionInternalBetaRelease {
    export enum type {
        BACKGROUND_ASSET_VERSION_INTERNAL_BETA_RELEASES = 'backgroundAssetVersionInternalBetaReleases',
    }
    export enum state {
        READY_FOR_TESTING = 'READY_FOR_TESTING',
        SUPERSEDED = 'SUPERSEDED',
    }
}

