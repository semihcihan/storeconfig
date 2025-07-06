/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { SubscriptionStatusUrlVersion } from './SubscriptionStatusUrlVersion';
export type App = {
    type: App.type;
    id: string;
    attributes?: {
        accessibilityUrl?: string;
        name?: string;
        bundleId?: string;
        sku?: string;
        primaryLocale?: string;
        isOrEverWasMadeForKids?: boolean;
        subscriptionStatusUrl?: string;
        subscriptionStatusUrlVersion?: SubscriptionStatusUrlVersion;
        subscriptionStatusUrlForSandbox?: string;
        subscriptionStatusUrlVersionForSandbox?: SubscriptionStatusUrlVersion;
        contentRightsDeclaration?: App.contentRightsDeclaration;
        streamlinedPurchasingEnabled?: boolean;
    };
    relationships?: {
        accessibilityDeclarations?: {
            links?: RelationshipLinks;
        };
        appEncryptionDeclarations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appEncryptionDeclarations';
                id: string;
            }>;
        };
        ciProduct?: {
            links?: RelationshipLinks;
            data?: {
                type: App.type;
                id: string;
            };
        };
        betaTesters?: {
            links?: RelationshipLinks;
        };
        betaGroups?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaGroups';
                id: string;
            }>;
        };
        appStoreVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersions';
                id: string;
            }>;
        };
        preReleaseVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'preReleaseVersions';
                id: string;
            }>;
        };
        betaAppLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaAppLocalizations';
                id: string;
            }>;
        };
        builds?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'builds';
                id: string;
            }>;
        };
        betaLicenseAgreement?: {
            links?: RelationshipLinks;
            data?: {
                type: App.type;
                id: string;
            };
        };
        betaAppReviewDetail?: {
            links?: RelationshipLinks;
            data?: {
                type: App.type;
                id: string;
            };
        };
        appInfos?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appInfos';
                id: string;
            }>;
        };
        appClips?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appClips';
                id: string;
            }>;
        };
        appPricePoints?: {
            links?: RelationshipLinks;
        };
        endUserLicenseAgreement?: {
            links?: RelationshipLinks;
            data?: {
                type: App.type;
                id: string;
            };
        };
        appPriceSchedule?: {
            links?: RelationshipLinks;
        };
        appAvailabilityV2?: {
            links?: RelationshipLinks;
        };
        /**
         * @deprecated
         */
        inAppPurchases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchases';
                id: string;
            }>;
        };
        subscriptionGroups?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'subscriptionGroups';
                id: string;
            }>;
        };
        gameCenterEnabledVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterEnabledVersions';
                id: string;
            }>;
        };
        perfPowerMetrics?: {
            links?: RelationshipLinks;
        };
        appCustomProductPages?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appCustomProductPages';
                id: string;
            }>;
        };
        inAppPurchasesV2?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'inAppPurchases';
                id: string;
            }>;
        };
        promotedPurchases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'promotedPurchases';
                id: string;
            }>;
        };
        appEvents?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appEvents';
                id: string;
            }>;
        };
        reviewSubmissions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'reviewSubmissions';
                id: string;
            }>;
        };
        subscriptionGracePeriod?: {
            links?: RelationshipLinks;
            data?: {
                type: App.type;
                id: string;
            };
        };
        customerReviews?: {
            links?: RelationshipLinks;
        };
        customerReviewSummarizations?: {
            links?: RelationshipLinks;
        };
        gameCenterDetail?: {
            links?: RelationshipLinks;
            data?: {
                type: App.type;
                id: string;
            };
        };
        appStoreVersionExperimentsV2?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersionExperiments';
                id: string;
            }>;
        };
        alternativeDistributionKey?: {
            links?: RelationshipLinks;
        };
        analyticsReportRequests?: {
            links?: RelationshipLinks;
        };
        marketplaceSearchDetail?: {
            links?: RelationshipLinks;
        };
        backgroundAssets?: {
            links?: RelationshipLinks;
        };
        betaFeedbackScreenshotSubmissions?: {
            links?: RelationshipLinks;
        };
        betaFeedbackCrashSubmissions?: {
            links?: RelationshipLinks;
        };
        webhooks?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace App {
    export enum type {
        APPS = 'apps',
    }
    export enum contentRightsDeclaration {
        DOES_NOT_USE_THIRD_PARTY_CONTENT = 'DOES_NOT_USE_THIRD_PARTY_CONTENT',
        USES_THIRD_PARTY_CONTENT = 'USES_THIRD_PARTY_CONTENT',
    }
}

