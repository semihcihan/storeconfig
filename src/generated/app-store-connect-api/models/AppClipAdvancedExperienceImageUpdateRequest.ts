/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppClipAdvancedExperienceImageUpdateRequest = {
    data: {
        type: AppClipAdvancedExperienceImageUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppClipAdvancedExperienceImageUpdateRequest {
    export enum type {
        APP_CLIP_ADVANCED_EXPERIENCE_IMAGES = 'appClipAdvancedExperienceImages',
    }
}

