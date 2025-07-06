/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Platform } from './Platform';
export type AppStoreVersionCreateRequest = {
    data: {
        type: AppStoreVersionCreateRequest.type;
        attributes: {
            platform: Platform;
            versionString: string;
            copyright?: string;
            reviewType?: AppStoreVersionCreateRequest.reviewType;
            releaseType?: AppStoreVersionCreateRequest.releaseType;
            earliestReleaseDate?: string;
            /**
             * @deprecated
             */
            usesIdfa?: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: AppStoreVersionCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionLocalizations?: {
                data?: Array<{
                    type: 'appStoreVersionLocalizations';
                    id: string;
                }>;
            };
            build?: {
                data?: {
                    type: AppStoreVersionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionCreateRequest {
    export enum type {
        APP_STORE_VERSIONS = 'appStoreVersions',
    }
    export enum reviewType {
        APP_STORE = 'APP_STORE',
        NOTARIZATION = 'NOTARIZATION',
    }
    export enum releaseType {
        MANUAL = 'MANUAL',
        AFTER_APPROVAL = 'AFTER_APPROVAL',
        SCHEDULED = 'SCHEDULED',
    }
}

