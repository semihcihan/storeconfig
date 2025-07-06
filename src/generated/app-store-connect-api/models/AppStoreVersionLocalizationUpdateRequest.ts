/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionLocalizationUpdateRequest = {
    data: {
        type: AppStoreVersionLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            description?: string;
            keywords?: string;
            marketingUrl?: string;
            promotionalText?: string;
            supportUrl?: string;
            whatsNew?: string;
        };
    };
};
export namespace AppStoreVersionLocalizationUpdateRequest {
    export enum type {
        APP_STORE_VERSION_LOCALIZATIONS = 'appStoreVersionLocalizations',
    }
}

