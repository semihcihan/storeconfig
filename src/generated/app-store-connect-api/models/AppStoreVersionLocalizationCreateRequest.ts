/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionLocalizationCreateRequest = {
    data: {
        type: AppStoreVersionLocalizationCreateRequest.type;
        attributes: {
            description?: string;
            locale: string;
            keywords?: string;
            marketingUrl?: string;
            promotionalText?: string;
            supportUrl?: string;
            whatsNew?: string;
        };
        relationships: {
            appStoreVersion: {
                data: {
                    type: AppStoreVersionLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionLocalizationCreateRequest {
    export enum type {
        APP_STORE_VERSION_LOCALIZATIONS = 'appStoreVersionLocalizations',
    }
}

