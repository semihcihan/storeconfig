/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhasedReleaseState } from './PhasedReleaseState';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreVersionPhasedRelease = {
    type: AppStoreVersionPhasedRelease.type;
    id: string;
    attributes?: {
        phasedReleaseState?: PhasedReleaseState;
        startDate?: string;
        totalPauseDuration?: number;
        currentDayNumber?: number;
    };
    links?: ResourceLinks;
};
export namespace AppStoreVersionPhasedRelease {
    export enum type {
        APP_STORE_VERSION_PHASED_RELEASES = 'appStoreVersionPhasedReleases',
    }
}

