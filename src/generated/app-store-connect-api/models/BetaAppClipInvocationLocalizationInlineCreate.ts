/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaAppClipInvocationLocalizationInlineCreate = {
    type: BetaAppClipInvocationLocalizationInlineCreate.type;
    id?: string;
    attributes: {
        title: string;
        locale: string;
    };
    relationships?: {
        betaAppClipInvocation?: {
            data?: {
                type: BetaAppClipInvocationLocalizationInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace BetaAppClipInvocationLocalizationInlineCreate {
    export enum type {
        BETA_APP_CLIP_INVOCATION_LOCALIZATIONS = 'betaAppClipInvocationLocalizations',
    }
}

