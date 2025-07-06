/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterMatchmakingRule = {
    type: GameCenterMatchmakingRule.type;
    id: string;
    attributes?: {
        referenceName?: string;
        description?: string;
        type?: GameCenterMatchmakingRule.type;
        expression?: string;
        weight?: number;
    };
    links?: ResourceLinks;
};
export namespace GameCenterMatchmakingRule {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULES = 'gameCenterMatchmakingRules',
    }
}

