/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAction } from './AppClipAction';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppClipDefaultExperience = {
    type: AppClipDefaultExperience.type;
    id: string;
    attributes?: {
        action?: AppClipAction;
    };
    relationships?: {
        appClip?: {
            data?: {
                type: AppClipDefaultExperience.type;
                id: string;
            };
        };
        releaseWithAppStoreVersion?: {
            links?: RelationshipLinks;
            data?: {
                type: AppClipDefaultExperience.type;
                id: string;
            };
        };
        appClipDefaultExperienceLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appClipDefaultExperienceLocalizations';
                id: string;
            }>;
        };
        appClipAppStoreReviewDetail?: {
            links?: RelationshipLinks;
            data?: {
                type: AppClipDefaultExperience.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppClipDefaultExperience {
    export enum type {
        APP_CLIP_DEFAULT_EXPERIENCES = 'appClipDefaultExperiences',
    }
}

