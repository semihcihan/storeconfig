/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type GameCenterActivityImage = {
    type: GameCenterActivityImage.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        imageAsset?: ImageAsset;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    links?: ResourceLinks;
};
export namespace GameCenterActivityImage {
    export enum type {
        GAME_CENTER_ACTIVITY_IMAGES = 'gameCenterActivityImages',
    }
}

