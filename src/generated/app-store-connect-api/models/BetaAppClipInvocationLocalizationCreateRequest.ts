/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaAppClipInvocationLocalizationCreateRequest = {
    data: {
        type: BetaAppClipInvocationLocalizationCreateRequest.type;
        attributes: {
            title: string;
            locale: string;
        };
        relationships: {
            betaAppClipInvocation: {
                data: {
                    type: BetaAppClipInvocationLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BetaAppClipInvocationLocalizationCreateRequest {
    export enum type {
        BETA_APP_CLIP_INVOCATION_LOCALIZATIONS = 'betaAppClipInvocationLocalizations',
    }
}

