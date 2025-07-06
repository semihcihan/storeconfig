/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaAppLocalization = {
    type: BetaAppLocalization.type;
    id: string;
    attributes?: {
        feedbackEmail?: string;
        marketingUrl?: string;
        privacyPolicyUrl?: string;
        tvOsPrivacyPolicy?: string;
        description?: string;
        locale?: string;
    };
    relationships?: {
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaAppLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaAppLocalization {
    export enum type {
        BETA_APP_LOCALIZATIONS = 'betaAppLocalizations',
    }
}

