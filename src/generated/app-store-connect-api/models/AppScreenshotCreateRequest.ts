/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppScreenshotCreateRequest = {
    data: {
        type: AppScreenshotCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            appScreenshotSet: {
                data: {
                    type: AppScreenshotCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppScreenshotCreateRequest {
    export enum type {
        APP_SCREENSHOTS = 'appScreenshots',
    }
}

