/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BackgroundAssetCreateRequest = {
    data: {
        type: BackgroundAssetCreateRequest.type;
        attributes: {
            assetPackIdentifier: string;
        };
        relationships: {
            app: {
                data: {
                    type: BackgroundAssetCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BackgroundAssetCreateRequest {
    export enum type {
        BACKGROUND_ASSETS = 'backgroundAssets',
    }
}

