/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppClipHeaderImageCreateRequest = {
    data: {
        type: AppClipHeaderImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            appClipDefaultExperienceLocalization: {
                data: {
                    type: AppClipHeaderImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppClipHeaderImageCreateRequest {
    export enum type {
        APP_CLIP_HEADER_IMAGES = 'appClipHeaderImages',
    }
}

