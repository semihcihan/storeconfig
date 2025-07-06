/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleIdPlatform } from './BundleIdPlatform';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type Profile = {
    type: Profile.type;
    id: string;
    attributes?: {
        name?: string;
        platform?: BundleIdPlatform;
        profileType?: Profile.profileType;
        profileState?: Profile.profileState;
        profileContent?: string;
        uuid?: string;
        createdDate?: string;
        expirationDate?: string;
    };
    relationships?: {
        bundleId?: {
            links?: RelationshipLinks;
            data?: {
                type: Profile.type;
                id: string;
            };
        };
        devices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'devices';
                id: string;
            }>;
        };
        certificates?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'certificates';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace Profile {
    export enum type {
        PROFILES = 'profiles',
    }
    export enum profileType {
        IOS_APP_DEVELOPMENT = 'IOS_APP_DEVELOPMENT',
        IOS_APP_STORE = 'IOS_APP_STORE',
        IOS_APP_ADHOC = 'IOS_APP_ADHOC',
        IOS_APP_INHOUSE = 'IOS_APP_INHOUSE',
        MAC_APP_DEVELOPMENT = 'MAC_APP_DEVELOPMENT',
        MAC_APP_STORE = 'MAC_APP_STORE',
        MAC_APP_DIRECT = 'MAC_APP_DIRECT',
        TVOS_APP_DEVELOPMENT = 'TVOS_APP_DEVELOPMENT',
        TVOS_APP_STORE = 'TVOS_APP_STORE',
        TVOS_APP_ADHOC = 'TVOS_APP_ADHOC',
        TVOS_APP_INHOUSE = 'TVOS_APP_INHOUSE',
        MAC_CATALYST_APP_DEVELOPMENT = 'MAC_CATALYST_APP_DEVELOPMENT',
        MAC_CATALYST_APP_STORE = 'MAC_CATALYST_APP_STORE',
        MAC_CATALYST_APP_DIRECT = 'MAC_CATALYST_APP_DIRECT',
    }
    export enum profileState {
        ACTIVE = 'ACTIVE',
        INVALID = 'INVALID',
    }
}

