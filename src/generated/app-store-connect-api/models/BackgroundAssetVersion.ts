/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetVersionState } from './BackgroundAssetVersionState';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BackgroundAssetVersion = {
    type: BackgroundAssetVersion.type;
    id: string;
    attributes?: {
        createdDate?: string;
        platforms?: Array<Platform>;
        state?: BackgroundAssetVersionState;
        version?: string;
    };
    relationships?: {
        internalBetaRelease?: {
            data?: {
                type: BackgroundAssetVersion.type;
                id: string;
            };
        };
        assetFile?: {
            data?: {
                type: BackgroundAssetVersion.type;
                id: string;
            };
        };
        manifestFile?: {
            data?: {
                type: BackgroundAssetVersion.type;
                id: string;
            };
        };
        backgroundAssetUploadFiles?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace BackgroundAssetVersion {
    export enum type {
        BACKGROUND_ASSET_VERSIONS = 'backgroundAssetVersions',
    }
}

