/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEventScreenshotUpdateRequest = {
    data: {
        type: AppEventScreenshotUpdateRequest.type;
        id: string;
        attributes?: {
            uploaded?: boolean;
        };
    };
};
export namespace AppEventScreenshotUpdateRequest {
    export enum type {
        APP_EVENT_SCREENSHOTS = 'appEventScreenshots',
    }
}

