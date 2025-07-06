/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppClipHeaderImageUpdateRequest = {
    data: {
        type: AppClipHeaderImageUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppClipHeaderImageUpdateRequest {
    export enum type {
        APP_CLIP_HEADER_IMAGES = 'appClipHeaderImages',
    }
}

