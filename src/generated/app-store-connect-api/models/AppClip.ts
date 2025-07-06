/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppClip = {
    type: AppClip.type;
    id: string;
    attributes?: {
        bundleId?: string;
    };
    relationships?: {
        app?: {
            data?: {
                type: AppClip.type;
                id: string;
            };
        };
        appClipDefaultExperiences?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appClipDefaultExperiences';
                id: string;
            }>;
        };
        appClipAdvancedExperiences?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace AppClip {
    export enum type {
        APP_CLIPS = 'appClips',
    }
}

