/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterDetail = {
    type: GameCenterDetail.type;
    id: string;
    attributes?: {
        arcadeEnabled?: boolean;
        /**
         * @deprecated
         */
        challengeEnabled?: boolean;
    };
    relationships?: {
        app?: {
            data?: {
                type: GameCenterDetail.type;
                id: string;
            };
        };
        gameCenterAppVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAppVersions';
                id: string;
            }>;
        };
        gameCenterGroup?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterDetail.type;
                id: string;
            };
        };
        gameCenterLeaderboards?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboards';
                id: string;
            }>;
        };
        gameCenterLeaderboardSets?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardSets';
                id: string;
            }>;
        };
        gameCenterAchievements?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAchievements';
                id: string;
            }>;
        };
        gameCenterActivities?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterActivities';
                id: string;
            }>;
        };
        gameCenterChallenges?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterChallenges';
                id: string;
            }>;
        };
        defaultLeaderboard?: {
            data?: {
                type: GameCenterDetail.type;
                id: string;
            };
        };
        defaultGroupLeaderboard?: {
            data?: {
                type: GameCenterDetail.type;
                id: string;
            };
        };
        achievementReleases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterAchievementReleases';
                id: string;
            }>;
        };
        activityReleases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterActivityVersionReleases';
                id: string;
            }>;
        };
        challengeReleases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterChallengeVersionReleases';
                id: string;
            }>;
        };
        leaderboardReleases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardReleases';
                id: string;
            }>;
        };
        leaderboardSetReleases?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterLeaderboardSetReleases';
                id: string;
            }>;
        };
        challengesMinimumPlatformVersions?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersions';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterDetail {
    export enum type {
        GAME_CENTER_DETAILS = 'gameCenterDetails',
    }
}

