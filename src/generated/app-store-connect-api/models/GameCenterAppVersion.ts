/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterAppVersion = {
    type: GameCenterAppVersion.type;
    id: string;
    attributes?: {
        enabled?: boolean;
    };
    relationships?: {
        compatibilityVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAppVersions';
                id: string;
            }>;
        };
        appStoreVersion?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterAppVersion.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterAppVersion {
    export enum type {
        GAME_CENTER_APP_VERSIONS = 'gameCenterAppVersions',
    }
}

