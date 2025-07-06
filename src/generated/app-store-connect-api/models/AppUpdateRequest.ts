/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionStatusUrlVersion } from './SubscriptionStatusUrlVersion';
export type AppUpdateRequest = {
    data: {
        type: AppUpdateRequest.type;
        id: string;
        attributes?: {
            accessibilityUrl?: string;
            bundleId?: string;
            primaryLocale?: string;
            subscriptionStatusUrl?: string;
            subscriptionStatusUrlVersion?: SubscriptionStatusUrlVersion;
            subscriptionStatusUrlForSandbox?: string;
            subscriptionStatusUrlVersionForSandbox?: SubscriptionStatusUrlVersion;
            contentRightsDeclaration?: AppUpdateRequest.contentRightsDeclaration;
            streamlinedPurchasingEnabled?: boolean;
        };
    };
};
export namespace AppUpdateRequest {
    export enum type {
        APPS = 'apps',
    }
    export enum contentRightsDeclaration {
        DOES_NOT_USE_THIRD_PARTY_CONTENT = 'DOES_NOT_USE_THIRD_PARTY_CONTENT',
        USES_THIRD_PARTY_CONTENT = 'USES_THIRD_PARTY_CONTENT',
    }
}

