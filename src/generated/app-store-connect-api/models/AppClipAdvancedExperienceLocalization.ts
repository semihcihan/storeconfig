/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAdvancedExperienceLanguage } from './AppClipAdvancedExperienceLanguage';
import type { ResourceLinks } from './ResourceLinks';
export type AppClipAdvancedExperienceLocalization = {
    type: AppClipAdvancedExperienceLocalization.type;
    id: string;
    attributes?: {
        language?: AppClipAdvancedExperienceLanguage;
        title?: string;
        subtitle?: string;
    };
    links?: ResourceLinks;
};
export namespace AppClipAdvancedExperienceLocalization {
    export enum type {
        APP_CLIP_ADVANCED_EXPERIENCE_LOCALIZATIONS = 'appClipAdvancedExperienceLocalizations',
    }
}

