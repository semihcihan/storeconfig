/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppInfoLocalizationUpdateRequest = {
    data: {
        type: AppInfoLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            subtitle?: string;
            privacyPolicyUrl?: string;
            privacyChoicesUrl?: string;
            privacyPolicyText?: string;
        };
    };
};
export namespace AppInfoLocalizationUpdateRequest {
    export enum type {
        APP_INFO_LOCALIZATIONS = 'appInfoLocalizations',
    }
}

