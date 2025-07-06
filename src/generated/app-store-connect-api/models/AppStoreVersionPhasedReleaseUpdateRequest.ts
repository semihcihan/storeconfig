/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhasedReleaseState } from './PhasedReleaseState';
export type AppStoreVersionPhasedReleaseUpdateRequest = {
    data: {
        type: AppStoreVersionPhasedReleaseUpdateRequest.type;
        id: string;
        attributes?: {
            phasedReleaseState?: PhasedReleaseState;
        };
    };
};
export namespace AppStoreVersionPhasedReleaseUpdateRequest {
    export enum type {
        APP_STORE_VERSION_PHASED_RELEASES = 'appStoreVersionPhasedReleases',
    }
}

