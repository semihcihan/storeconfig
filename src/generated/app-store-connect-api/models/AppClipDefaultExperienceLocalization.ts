/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppClipDefaultExperienceLocalization = {
    type: AppClipDefaultExperienceLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        subtitle?: string;
    };
    relationships?: {
        appClipDefaultExperience?: {
            data?: {
                type: AppClipDefaultExperienceLocalization.type;
                id: string;
            };
        };
        appClipHeaderImage?: {
            links?: RelationshipLinks;
            data?: {
                type: AppClipDefaultExperienceLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppClipDefaultExperienceLocalization {
    export enum type {
        APP_CLIP_DEFAULT_EXPERIENCE_LOCALIZATIONS = 'appClipDefaultExperienceLocalizations',
    }
}

