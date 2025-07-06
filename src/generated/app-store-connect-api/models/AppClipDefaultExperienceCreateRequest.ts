/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAction } from './AppClipAction';
export type AppClipDefaultExperienceCreateRequest = {
    data: {
        type: AppClipDefaultExperienceCreateRequest.type;
        attributes?: {
            action?: AppClipAction;
        };
        relationships: {
            appClip: {
                data: {
                    type: AppClipDefaultExperienceCreateRequest.type;
                    id: string;
                };
            };
            releaseWithAppStoreVersion?: {
                data?: {
                    type: AppClipDefaultExperienceCreateRequest.type;
                    id: string;
                };
            };
            appClipDefaultExperienceTemplate?: {
                data?: {
                    type: AppClipDefaultExperienceCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppClipDefaultExperienceCreateRequest {
    export enum type {
        APP_CLIP_DEFAULT_EXPERIENCES = 'appClipDefaultExperiences',
    }
}

