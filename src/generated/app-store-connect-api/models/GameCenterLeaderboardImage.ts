/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type GameCenterLeaderboardImage = {
    type: GameCenterLeaderboardImage.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        imageAsset?: ImageAsset;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    relationships?: {
        gameCenterLeaderboardLocalization?: {
            data?: {
                type: GameCenterLeaderboardImage.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterLeaderboardImage {
    export enum type {
        GAME_CENTER_LEADERBOARD_IMAGES = 'gameCenterLeaderboardImages',
    }
}

