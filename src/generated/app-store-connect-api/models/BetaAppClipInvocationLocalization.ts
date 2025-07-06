/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type BetaAppClipInvocationLocalization = {
    type: BetaAppClipInvocationLocalization.type;
    id: string;
    attributes?: {
        title?: string;
        locale?: string;
    };
    links?: ResourceLinks;
};
export namespace BetaAppClipInvocationLocalization {
    export enum type {
        BETA_APP_CLIP_INVOCATION_LOCALIZATIONS = 'betaAppClipInvocationLocalizations',
    }
}

