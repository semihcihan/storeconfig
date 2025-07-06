/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhasedReleaseState } from './PhasedReleaseState';
export type AppStoreVersionPhasedReleaseCreateRequest = {
    data: {
        type: AppStoreVersionPhasedReleaseCreateRequest.type;
        attributes?: {
            phasedReleaseState?: PhasedReleaseState;
        };
        relationships: {
            appStoreVersion: {
                data: {
                    type: AppStoreVersionPhasedReleaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionPhasedReleaseCreateRequest {
    export enum type {
        APP_STORE_VERSION_PHASED_RELEASES = 'appStoreVersionPhasedReleases',
    }
}

