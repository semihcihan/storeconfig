/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { DeliveryFileUploadOperation } from './DeliveryFileUploadOperation';
import type { ResourceLinks } from './ResourceLinks';
export type BackgroundAssetUploadFile = {
    type: BackgroundAssetUploadFile.type;
    id: string;
    attributes?: {
        assetDeliveryState?: AppMediaAssetState;
        assetToken?: string;
        assetType?: BackgroundAssetUploadFile.assetType;
        fileName?: string;
        fileSize?: number;
        sourceFileChecksum?: string;
        uploadOperations?: Array<DeliveryFileUploadOperation>;
    };
    links?: ResourceLinks;
};
export namespace BackgroundAssetUploadFile {
    export enum type {
        BACKGROUND_ASSET_UPLOAD_FILES = 'backgroundAssetUploadFiles',
    }
    export enum assetType {
        ASSET = 'ASSET',
        MANIFEST = 'MANIFEST',
    }
}

