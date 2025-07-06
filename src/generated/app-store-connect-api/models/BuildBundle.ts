/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildBundleType } from './BuildBundleType';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BuildBundle = {
    type: BuildBundle.type;
    id: string;
    attributes?: {
        bundleId?: string;
        bundleType?: BuildBundleType;
        sdkBuild?: string;
        platformBuild?: string;
        fileName?: string;
        hasSirikit?: boolean;
        hasOnDemandResources?: boolean;
        hasPrerenderedIcon?: boolean;
        usesLocationServices?: boolean;
        isIosBuildMacAppStoreCompatible?: boolean;
        includesSymbols?: boolean;
        dSYMUrl?: string;
        supportedArchitectures?: Array<string>;
        requiredCapabilities?: Array<string>;
        deviceProtocols?: Array<string>;
        locales?: Array<string>;
        entitlements?: Record<string, Record<string, string>>;
        baDownloadAllowance?: number;
        baMaxInstallSize?: number;
    };
    relationships?: {
        appClipDomainCacheStatus?: {
            links?: RelationshipLinks;
            data?: {
                type: BuildBundle.type;
                id: string;
            };
        };
        appClipDomainDebugStatus?: {
            links?: RelationshipLinks;
            data?: {
                type: BuildBundle.type;
                id: string;
            };
        };
        betaAppClipInvocations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaAppClipInvocations';
                id: string;
            }>;
        };
        buildBundleFileSizes?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'buildBundleFileSizes';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace BuildBundle {
    export enum type {
        BUILD_BUNDLES = 'buildBundles',
    }
}

