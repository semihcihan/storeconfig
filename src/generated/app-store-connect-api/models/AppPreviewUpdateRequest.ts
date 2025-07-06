/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppPreviewUpdateRequest = {
    data: {
        type: AppPreviewUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            previewFrameTimeCode?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppPreviewUpdateRequest {
    export enum type {
        APP_PREVIEWS = 'appPreviews',
    }
}

