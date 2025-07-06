/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersionState } from './AppStoreVersionState';
import type { AppVersionState } from './AppVersionState';
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreVersion = {
    type: AppStoreVersion.type;
    id: string;
    attributes?: {
        platform?: Platform;
        versionString?: string;
        /**
         * @deprecated
         */
        appStoreState?: AppStoreVersionState;
        appVersionState?: AppVersionState;
        copyright?: string;
        reviewType?: AppStoreVersion.reviewType;
        releaseType?: AppStoreVersion.releaseType;
        earliestReleaseDate?: string;
        /**
         * @deprecated
         */
        usesIdfa?: boolean;
        downloadable?: boolean;
        createdDate?: string;
    };
    relationships?: {
        app?: {
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        /**
         * @deprecated
         */
        ageRatingDeclaration?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        appStoreVersionLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersionLocalizations';
                id: string;
            }>;
        };
        build?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        appStoreVersionPhasedRelease?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        gameCenterAppVersion?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        routingAppCoverage?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        appStoreReviewDetail?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        appStoreVersionSubmission?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        appClipDefaultExperience?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
        appStoreVersionExperiments?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersionExperiments';
                id: string;
            }>;
        };
        appStoreVersionExperimentsV2?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersionExperiments';
                id: string;
            }>;
        };
        customerReviews?: {
            links?: RelationshipLinks;
        };
        alternativeDistributionPackage?: {
            links?: RelationshipLinks;
            data?: {
                type: AppStoreVersion.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreVersion {
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

