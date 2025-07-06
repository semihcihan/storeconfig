/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageAsset } from './ImageAsset';
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
/**
 * @deprecated
 */
export type GameCenterEnabledVersion = {
    type: GameCenterEnabledVersion.type;
    id: string;
    attributes?: {
        platform?: Platform;
        versionString?: string;
        iconAsset?: ImageAsset;
    };
    relationships?: {
        compatibleVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterEnabledVersions';
                id: string;
            }>;
        };
        app?: {
            data?: {
                type: GameCenterEnabledVersion.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterEnabledVersion {
    export enum type {
        GAME_CENTER_ENABLED_VERSIONS = 'gameCenterEnabledVersions',
    }
}

