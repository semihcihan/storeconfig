/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingTestPlayerPropertyInlineCreate } from './GameCenterMatchmakingTestPlayerPropertyInlineCreate';
import type { GameCenterMatchmakingTestRequestInlineCreate } from './GameCenterMatchmakingTestRequestInlineCreate';
export type GameCenterMatchmakingRuleSetTestCreateRequest = {
    data: {
        type: GameCenterMatchmakingRuleSetTestCreateRequest.type;
        relationships: {
            matchmakingRuleSet: {
                data: {
                    type: GameCenterMatchmakingRuleSetTestCreateRequest.type;
                    id: string;
                };
            };
            matchmakingRequests: {
                data: Array<{
                    type: 'gameCenterMatchmakingTestRequests';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<(GameCenterMatchmakingTestPlayerPropertyInlineCreate | GameCenterMatchmakingTestRequestInlineCreate)>;
};
export namespace GameCenterMatchmakingRuleSetTestCreateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULE_SET_TESTS = 'gameCenterMatchmakingRuleSetTests',
    }
}

