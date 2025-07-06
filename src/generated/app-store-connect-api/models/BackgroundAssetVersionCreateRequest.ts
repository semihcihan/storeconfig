/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BackgroundAssetVersionCreateRequest = {
    data: {
        type: BackgroundAssetVersionCreateRequest.type;
        relationships: {
            backgroundAsset: {
                data: {
                    type: BackgroundAssetVersionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BackgroundAssetVersionCreateRequest {
    export enum type {
        BACKGROUND_ASSET_VERSIONS = 'backgroundAssetVersions',
    }
}

