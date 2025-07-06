/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdPlatform } from './BundleIdPlatform';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BundleId = {
    type: BundleId.type;
    id: string;
    attributes?: {
        name?: string;
        platform?: BundleIdPlatform;
        identifier?: string;
        seedId?: string;
    };
    relationships?: {
        profiles?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'profiles';
                id: string;
            }>;
        };
        bundleIdCapabilities?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'bundleIdCapabilities';
                id: string;
            }>;
        };
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: BundleId.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BundleId {
    export enum type {
        BUNDLE_IDS = 'bundleIds',
    }
}

