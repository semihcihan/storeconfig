/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterVersionState } from './GameCenterVersionState';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterActivityVersion = {
    type: GameCenterActivityVersion.type;
    id: string;
    attributes?: {
        version?: number;
        state?: GameCenterVersionState;
        fallbackUrl?: string;
    };
    relationships?: {
        activity?: {
            data?: {
                type: GameCenterActivityVersion.type;
                id: string;
            };
        };
        localizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterActivityLocalizations';
                id: string;
            }>;
        };
        defaultImage?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterActivityVersion.type;
                id: string;
            };
        };
        releases?: {
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterActivityVersionReleases';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterActivityVersion {
    export enum type {
        GAME_CENTER_ACTIVITY_VERSIONS = 'gameCenterActivityVersions',
    }
}

