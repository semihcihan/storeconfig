/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingRuleSetUpdateRequest = {
    data: {
        type: GameCenterMatchmakingRuleSetUpdateRequest.type;
        id: string;
        attributes?: {
            minPlayers?: number;
            maxPlayers?: number;
        };
    };
};
export namespace GameCenterMatchmakingRuleSetUpdateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULE_SETS = 'gameCenterMatchmakingRuleSets',
    }
}

