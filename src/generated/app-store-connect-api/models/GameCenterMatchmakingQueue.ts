/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterMatchmakingQueue = {
    type: GameCenterMatchmakingQueue.type;
    id: string;
    attributes?: {
        referenceName?: string;
        classicMatchmakingBundleIds?: Array<string>;
    };
    relationships?: {
        ruleSet?: {
            data?: {
                type: GameCenterMatchmakingQueue.type;
                id: string;
            };
        };
        experimentRuleSet?: {
            data?: {
                type: GameCenterMatchmakingQueue.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterMatchmakingQueue {
    export enum type {
        GAME_CENTER_MATCHMAKING_QUEUES = 'gameCenterMatchmakingQueues',
    }
}

