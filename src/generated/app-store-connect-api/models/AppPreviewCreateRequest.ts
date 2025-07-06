/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppPreviewCreateRequest = {
    data: {
        type: AppPreviewCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
            previewFrameTimeCode?: string;
            mimeType?: string;
        };
        relationships: {
            appPreviewSet: {
                data: {
                    type: AppPreviewCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppPreviewCreateRequest {
    export enum type {
        APP_PREVIEWS = 'appPreviews',
    }
}

