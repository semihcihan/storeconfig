/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BackgroundAssetUploadFileUpdateRequest = {
    data: {
        type: BackgroundAssetUploadFileUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace BackgroundAssetUploadFileUpdateRequest {
    export enum type {
        BACKGROUND_ASSET_UPLOAD_FILES = 'backgroundAssetUploadFiles',
    }
}

