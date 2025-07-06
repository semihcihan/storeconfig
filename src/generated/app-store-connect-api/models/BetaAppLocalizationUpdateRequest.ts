/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaAppLocalizationUpdateRequest = {
    data: {
        type: BetaAppLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            feedbackEmail?: string;
            marketingUrl?: string;
            privacyPolicyUrl?: string;
            tvOsPrivacyPolicy?: string;
            description?: string;
        };
    };
};
export namespace BetaAppLocalizationUpdateRequest {
    export enum type {
        BETA_APP_LOCALIZATIONS = 'betaAppLocalizations',
    }
}

