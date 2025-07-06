/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEventLocalizationCreateRequest = {
    data: {
        type: AppEventLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name?: string;
            shortDescription?: string;
            longDescription?: string;
        };
        relationships: {
            appEvent: {
                data: {
                    type: AppEventLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppEventLocalizationCreateRequest {
    export enum type {
        APP_EVENT_LOCALIZATIONS = 'appEventLocalizations',
    }
}

