/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppClipInvocationLocalizationInlineCreate } from './BetaAppClipInvocationLocalizationInlineCreate';
export type BetaAppClipInvocationCreateRequest = {
    data: {
        type: BetaAppClipInvocationCreateRequest.type;
        attributes: {
            url: string;
        };
        relationships: {
            buildBundle: {
                data: {
                    type: BetaAppClipInvocationCreateRequest.type;
                    id: string;
                };
            };
            betaAppClipInvocationLocalizations: {
                data: Array<{
                    type: 'betaAppClipInvocationLocalizations';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<BetaAppClipInvocationLocalizationInlineCreate>;
};
export namespace BetaAppClipInvocationCreateRequest {
    export enum type {
        BETA_APP_CLIP_INVOCATIONS = 'betaAppClipInvocations',
    }
}

