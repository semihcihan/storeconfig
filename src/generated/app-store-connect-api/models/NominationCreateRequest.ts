/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamily } from './DeviceFamily';
export type NominationCreateRequest = {
    data: {
        type: NominationCreateRequest.type;
        attributes: {
            name: string;
            type: NominationCreateRequest.type;
            description: string;
            submitted: boolean;
            publishStartDate: string;
            publishEndDate?: string;
            deviceFamilies?: Array<DeviceFamily>;
            locales?: Array<string>;
            supplementalMaterialsUris?: Array<string>;
            hasInAppEvents?: boolean;
            launchInSelectMarketsFirst?: boolean;
            notes?: string;
            preOrderEnabled?: boolean;
        };
        relationships: {
            relatedApps: {
                data: Array<{
                    type: 'apps';
                    id: string;
                }>;
            };
            inAppEvents?: {
                data?: Array<{
                    type: 'appEvents';
                    id: string;
                }>;
            };
            supportedTerritories?: {
                data?: Array<{
                    type: 'territories';
                    id: string;
                }>;
            };
        };
    };
};
export namespace NominationCreateRequest {
    export enum type {
        NOMINATIONS = 'nominations',
    }
}

