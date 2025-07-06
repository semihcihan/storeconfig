/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamily } from './DeviceFamily';
import type { PagingInformation } from './PagingInformation';
import type { ResourceLinks } from './ResourceLinks';
export type Nomination = {
    type: Nomination.type;
    id: string;
    attributes?: {
        name?: string;
        type?: Nomination.type;
        description?: string;
        createdDate?: string;
        lastModifiedDate?: string;
        submittedDate?: string;
        state?: Nomination.state;
        publishStartDate?: string;
        publishEndDate?: string;
        deviceFamilies?: Array<DeviceFamily>;
        locales?: Array<string>;
        supplementalMaterialsUris?: Array<string>;
        hasInAppEvents?: boolean;
        launchInSelectMarketsFirst?: boolean;
        notes?: string;
        preOrderEnabled?: boolean;
    };
    relationships?: {
        relatedApps?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'apps';
                id: string;
            }>;
        };
        createdByActor?: {
            data?: {
                type: Nomination.type;
                id: string;
            };
        };
        lastModifiedByActor?: {
            data?: {
                type: Nomination.type;
                id: string;
            };
        };
        submittedByActor?: {
            data?: {
                type: Nomination.type;
                id: string;
            };
        };
        inAppEvents?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'appEvents';
                id: string;
            }>;
        };
        supportedTerritories?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'territories';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace Nomination {
    export enum type {
        NOMINATIONS = 'nominations',
    }
    export enum state {
        DRAFT = 'DRAFT',
        SUBMITTED = 'SUBMITTED',
        ARCHIVED = 'ARCHIVED',
    }
}

