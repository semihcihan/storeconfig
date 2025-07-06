/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingRuleSetCreateRequest = {
    data: {
        type: GameCenterMatchmakingRuleSetCreateRequest.type;
        attributes: {
            referenceName: string;
            ruleLanguageVersion: number;
            minPlayers: number;
            maxPlayers: number;
        };
    };
};
export namespace GameCenterMatchmakingRuleSetCreateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULE_SETS = 'gameCenterMatchmakingRuleSets',
    }
}

