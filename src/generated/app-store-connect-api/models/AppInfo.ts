/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreAgeRating } from './AppStoreAgeRating';
import type { AppStoreVersionState } from './AppStoreVersionState';
import type { BrazilAgeRating } from './BrazilAgeRating';
import type { KidsAgeBand } from './KidsAgeBand';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppInfo = {
    type: AppInfo.type;
    id: string;
    attributes?: {
        /**
         * @deprecated
         */
        appStoreState?: AppStoreVersionState;
        state?: AppInfo.state;
        /**
         * @deprecated
         */
        appStoreAgeRating?: AppStoreAgeRating;
        /**
         * @deprecated
         */
        australiaAgeRating?: AppInfo.australiaAgeRating;
        /**
         * @deprecated
         */
        brazilAgeRating?: BrazilAgeRating;
        /**
         * @deprecated
         */
        brazilAgeRatingV2?: AppInfo.brazilAgeRatingV2;
        /**
         * @deprecated
         */
        franceAgeRating?: AppInfo.franceAgeRating;
        /**
         * @deprecated
         */
        koreaAgeRating?: AppInfo.koreaAgeRating;
        kidsAgeBand?: KidsAgeBand;
    };
    relationships?: {
        app?: {
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        ageRatingDeclaration?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        appInfoLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appInfoLocalizations';
                id: string;
            }>;
        };
        primaryCategory?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        primarySubcategoryOne?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        primarySubcategoryTwo?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        secondaryCategory?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        secondarySubcategoryOne?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
        secondarySubcategoryTwo?: {
            links?: RelationshipLinks;
            data?: {
                type: AppInfo.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppInfo {
    export enum type {
        APP_INFOS = 'appInfos',
    }
    export enum state {
        ACCEPTED = 'ACCEPTED',
        DEVELOPER_REJECTED = 'DEVELOPER_REJECTED',
        IN_REVIEW = 'IN_REVIEW',
        PENDING_RELEASE = 'PENDING_RELEASE',
        PREPARE_FOR_SUBMISSION = 'PREPARE_FOR_SUBMISSION',
        READY_FOR_DISTRIBUTION = 'READY_FOR_DISTRIBUTION',
        READY_FOR_REVIEW = 'READY_FOR_REVIEW',
        REJECTED = 'REJECTED',
        REPLACED_WITH_NEW_INFO = 'REPLACED_WITH_NEW_INFO',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
    }
    export enum australiaAgeRating {
        FIFTEEN = 'FIFTEEN',
        EIGHTEEN = 'EIGHTEEN',
    }
    export enum brazilAgeRatingV2 {
        SELF_RATED_L = 'SELF_RATED_L',
        SELF_RATED_TEN = 'SELF_RATED_TEN',
        SELF_RATED_TWELVE = 'SELF_RATED_TWELVE',
        SELF_RATED_FOURTEEN = 'SELF_RATED_FOURTEEN',
        SELF_RATED_SIXTEEN = 'SELF_RATED_SIXTEEN',
        SELF_RATED_EIGHTEEN = 'SELF_RATED_EIGHTEEN',
        OFFICIAL_L = 'OFFICIAL_L',
        OFFICIAL_TEN = 'OFFICIAL_TEN',
        OFFICIAL_TWELVE = 'OFFICIAL_TWELVE',
        OFFICIAL_FOURTEEN = 'OFFICIAL_FOURTEEN',
        OFFICIAL_SIXTEEN = 'OFFICIAL_SIXTEEN',
        OFFICIAL_EIGHTEEN = 'OFFICIAL_EIGHTEEN',
    }
    export enum franceAgeRating {
        EIGHTEEN = 'EIGHTEEN',
    }
    export enum koreaAgeRating {
        ALL = 'ALL',
        TWELVE = 'TWELVE',
        FIFTEEN = 'FIFTEEN',
        NINETEEN = 'NINETEEN',
        NOT_APPLICABLE = 'NOT_APPLICABLE',
    }
}

