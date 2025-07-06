/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BackgroundAssetUploadFileCreateRequest = {
    data: {
        type: BackgroundAssetUploadFileCreateRequest.type;
        attributes: {
            assetType: BackgroundAssetUploadFileCreateRequest.assetType;
            fileName: string;
            fileSize: number;
        };
        relationships: {
            backgroundAssetVersion: {
                data: {
                    type: BackgroundAssetUploadFileCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BackgroundAssetUploadFileCreateRequest {
    export enum type {
        BACKGROUND_ASSET_UPLOAD_FILES = 'backgroundAssetUploadFiles',
    }
    export enum assetType {
        ASSET = 'ASSET',
        MANIFEST = 'MANIFEST',
    }
}

