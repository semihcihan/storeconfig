/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEventLocalizationUpdateRequest = {
    data: {
        type: AppEventLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            shortDescription?: string;
            longDescription?: string;
        };
    };
};
export namespace AppEventLocalizationUpdateRequest {
    export enum type {
        APP_EVENT_LOCALIZATIONS = 'appEventLocalizations',
    }
}

