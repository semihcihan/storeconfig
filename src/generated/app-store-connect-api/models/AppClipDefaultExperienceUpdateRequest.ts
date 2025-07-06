/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAction } from './AppClipAction';
export type AppClipDefaultExperienceUpdateRequest = {
    data: {
        type: AppClipDefaultExperienceUpdateRequest.type;
        id: string;
        attributes?: {
            action?: AppClipAction;
        };
        relationships?: {
            releaseWithAppStoreVersion?: {
                data?: {
                    type: AppClipDefaultExperienceUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppClipDefaultExperienceUpdateRequest {
    export enum type {
        APP_CLIP_DEFAULT_EXPERIENCES = 'appClipDefaultExperiences',
    }
}

