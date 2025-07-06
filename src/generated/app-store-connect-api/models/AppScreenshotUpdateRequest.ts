/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppScreenshotUpdateRequest = {
    data: {
        type: AppScreenshotUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppScreenshotUpdateRequest {
    export enum type {
        APP_SCREENSHOTS = 'appScreenshots',
    }
}

