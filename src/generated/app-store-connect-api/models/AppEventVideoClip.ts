/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventAssetType } from './AppEventAssetType';
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { AppMediaVideoState } from './AppMediaVideoState';
import type { ImageAsset } from './ImageAsset';
import type { PreviewFrameImage } from './PreviewFrameImage';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppEventVideoClip = {
    type: AppEventVideoClip.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        previewFrameTimeCode?: string;
        videoUrl?: string;
        previewFrameImage?: PreviewFrameImage;
        /**
         * @deprecated
         */
        previewImage?: ImageAsset;
        uploadOperations?: Array<UploadOperation>;
        /**
         * @deprecated
         */
        assetDeliveryState?: AppMediaAssetState;
        videoDeliveryState?: AppMediaVideoState;
        appEventAssetType?: AppEventAssetType;
    };
    relationships?: {
        appEventLocalization?: {
            data?: {
                type: AppEventVideoClip.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppEventVideoClip {
    export enum type {
        APP_EVENT_VIDEO_CLIPS = 'appEventVideoClips',
    }
}

