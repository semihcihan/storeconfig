/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { AppMediaVideoState } from './AppMediaVideoState';
import type { ImageAsset } from './ImageAsset';
import type { PreviewFrameImage } from './PreviewFrameImage';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppPreview = {
    type: AppPreview.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        sourceFileChecksum?: string;
        previewFrameTimeCode?: string;
        mimeType?: string;
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
    };
    relationships?: {
        appPreviewSet?: {
            data?: {
                type: AppPreview.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppPreview {
    export enum type {
        APP_PREVIEWS = 'appPreviews',
    }
}

