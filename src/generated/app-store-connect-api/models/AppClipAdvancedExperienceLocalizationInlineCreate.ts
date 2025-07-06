/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAdvancedExperienceLanguage } from './AppClipAdvancedExperienceLanguage';
export type AppClipAdvancedExperienceLocalizationInlineCreate = {
    type: AppClipAdvancedExperienceLocalizationInlineCreate.type;
    id?: string;
    attributes?: {
        language?: AppClipAdvancedExperienceLanguage;
        title?: string;
        subtitle?: string;
    };
};
export namespace AppClipAdvancedExperienceLocalizationInlineCreate {
    export enum type {
        APP_CLIP_ADVANCED_EXPERIENCE_LOCALIZATIONS = 'appClipAdvancedExperienceLocalizations',
    }
}

