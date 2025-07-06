/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamily } from './DeviceFamily';
export type NominationUpdateRequest = {
    data: {
        type: NominationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            type?: NominationUpdateRequest.type;
            description?: string;
            submitted?: boolean;
            archived?: boolean;
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
                data?: Array<{
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
export namespace NominationUpdateRequest {
    export enum type {
        NOMINATIONS = 'nominations',
    }
}

