/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildAudienceType } from './BuildAudienceType';
import type { ImageAsset } from './ImageAsset';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type Build = {
    type: Build.type;
    id: string;
    attributes?: {
        version?: string;
        uploadedDate?: string;
        expirationDate?: string;
        expired?: boolean;
        minOsVersion?: string;
        lsMinimumSystemVersion?: string;
        computedMinMacOsVersion?: string;
        computedMinVisionOsVersion?: string;
        iconAssetToken?: ImageAsset;
        processingState?: Build.processingState;
        buildAudienceType?: BuildAudienceType;
        usesNonExemptEncryption?: boolean;
    };
    relationships?: {
        preReleaseVersion?: {
            links?: RelationshipLinks;
            data?: {
                type: Build.type;
                id: string;
            };
        };
        individualTesters?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaTesters';
                id: string;
            }>;
        };
        betaGroups?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaGroups';
                id: string;
            }>;
        };
        betaBuildLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaBuildLocalizations';
                id: string;
            }>;
        };
        appEncryptionDeclaration?: {
            links?: RelationshipLinks;
            data?: {
                type: Build.type;
                id: string;
            };
        };
        betaAppReviewSubmission?: {
            links?: RelationshipLinks;
            data?: {
                type: Build.type;
                id: string;
            };
        };
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: Build.type;
                id: string;
            };
        };
        buildBetaDetail?: {
            links?: RelationshipLinks;
            data?: {
                type: Build.type;
                id: string;
            };
        };
        appStoreVersion?: {
            links?: RelationshipLinks;
            data?: {
                type: Build.type;
                id: string;
            };
        };
        icons?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'buildIcons';
                id: string;
            }>;
        };
        buildBundles?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'buildBundles';
                id: string;
            }>;
        };
        perfPowerMetrics?: {
            links?: RelationshipLinks;
        };
        diagnosticSignatures?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace Build {
    export enum type {
        BUILDS = 'builds',
    }
    export enum processingState {
        PROCESSING = 'PROCESSING',
        FAILED = 'FAILED',
        INVALID = 'INVALID',
        VALID = 'VALID',
    }
}

