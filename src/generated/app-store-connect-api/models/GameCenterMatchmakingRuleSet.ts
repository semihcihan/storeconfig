/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterMatchmakingRuleSet = {
    type: GameCenterMatchmakingRuleSet.type;
    id: string;
    attributes?: {
        referenceName?: string;
        ruleLanguageVersion?: number;
        minPlayers?: number;
        maxPlayers?: number;
    };
    relationships?: {
        teams?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterMatchmakingTeams';
                id: string;
            }>;
        };
        rules?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterMatchmakingRules';
                id: string;
            }>;
        };
        matchmakingQueues?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'gameCenterMatchmakingQueues';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterMatchmakingRuleSet {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULE_SETS = 'gameCenterMatchmakingRuleSets',
    }
}

