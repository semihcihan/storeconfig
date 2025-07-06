/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BackgroundAsset = {
    type: BackgroundAsset.type;
    id: string;
    attributes?: {
        assetPackIdentifier?: string;
        createdDate?: string;
    };
    relationships?: {
        versions?: {
            links?: RelationshipLinks;
        };
        internalBetaVersion?: {
            data?: {
                type: BackgroundAsset.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BackgroundAsset {
    export enum type {
        BACKGROUND_ASSETS = 'backgroundAssets',
    }
}

