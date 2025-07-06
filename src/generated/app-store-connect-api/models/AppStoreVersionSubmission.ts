/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
/**
 * @deprecated
 */
export type AppStoreVersionSubmission = {
    type: AppStoreVersionSubmission.type;
    id: string;
    relationships?: {
        appStoreVersion?: {
            data?: {
                type: AppStoreVersionSubmission.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreVersionSubmission {
    export enum type {
        APP_STORE_VERSION_SUBMISSIONS = 'appStoreVersionSubmissions',
    }
}

