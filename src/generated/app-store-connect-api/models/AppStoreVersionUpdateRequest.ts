/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionUpdateRequest = {
    data: {
        type: AppStoreVersionUpdateRequest.type;
        id: string;
        attributes?: {
            versionString?: string;
            copyright?: string;
            reviewType?: AppStoreVersionUpdateRequest.reviewType;
            releaseType?: AppStoreVersionUpdateRequest.releaseType;
            earliestReleaseDate?: string;
            /**
             * @deprecated
             */
            usesIdfa?: boolean;
            downloadable?: boolean;
        };
        relationships?: {
            build?: {
                data?: {
                    type: AppStoreVersionUpdateRequest.type;
                    id: string;
                };
            };
            appClipDefaultExperience?: {
                data?: {
                    type: AppStoreVersionUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionUpdateRequest {
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

