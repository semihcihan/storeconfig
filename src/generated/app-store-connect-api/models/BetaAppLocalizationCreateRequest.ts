/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaAppLocalizationCreateRequest = {
    data: {
        type: BetaAppLocalizationCreateRequest.type;
        attributes: {
            feedbackEmail?: string;
            marketingUrl?: string;
            privacyPolicyUrl?: string;
            tvOsPrivacyPolicy?: string;
            description?: string;
            locale: string;
        };
        relationships: {
            app: {
                data: {
                    type: BetaAppLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BetaAppLocalizationCreateRequest {
    export enum type {
        BETA_APP_LOCALIZATIONS = 'betaAppLocalizations',
    }
}

