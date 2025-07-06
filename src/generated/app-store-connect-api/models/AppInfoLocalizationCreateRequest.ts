/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppInfoLocalizationCreateRequest = {
    data: {
        type: AppInfoLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name: string;
            subtitle?: string;
            privacyPolicyUrl?: string;
            privacyChoicesUrl?: string;
            privacyPolicyText?: string;
        };
        relationships: {
            appInfo: {
                data: {
                    type: AppInfoLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppInfoLocalizationCreateRequest {
    export enum type {
        APP_INFO_LOCALIZATIONS = 'appInfoLocalizations',
    }
}

