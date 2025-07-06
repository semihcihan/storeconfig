/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AppInfoLocalization = {
    type: AppInfoLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
        subtitle?: string;
        privacyPolicyUrl?: string;
        privacyChoicesUrl?: string;
        privacyPolicyText?: string;
    };
    relationships?: {
        appInfo?: {
            data?: {
                type: AppInfoLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppInfoLocalization {
    export enum type {
        APP_INFO_LOCALIZATIONS = 'appInfoLocalizations',
    }
}

