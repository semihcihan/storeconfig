/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppClipDefaultExperienceLocalizationCreateRequest = {
    data: {
        type: AppClipDefaultExperienceLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            subtitle?: string;
        };
        relationships: {
            appClipDefaultExperience: {
                data: {
                    type: AppClipDefaultExperienceLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppClipDefaultExperienceLocalizationCreateRequest {
    export enum type {
        APP_CLIP_DEFAULT_EXPERIENCE_LOCALIZATIONS = 'appClipDefaultExperienceLocalizations',
    }
}

