/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { ResourceLinks } from './ResourceLinks';
export type BetaAppClipInvocation = {
    type: BetaAppClipInvocation.type;
    id: string;
    attributes?: {
        url?: string;
    };
    relationships?: {
        betaAppClipInvocationLocalizations?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaAppClipInvocationLocalizations';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace BetaAppClipInvocation {
    export enum type {
        BETA_APP_CLIP_INVOCATIONS = 'betaAppClipInvocations',
    }
}

