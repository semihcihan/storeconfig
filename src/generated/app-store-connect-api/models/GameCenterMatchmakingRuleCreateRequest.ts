/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingRuleCreateRequest = {
    data: {
        type: GameCenterMatchmakingRuleCreateRequest.type;
        attributes: {
            referenceName: string;
            description: string;
            type: GameCenterMatchmakingRuleCreateRequest.type;
            expression: string;
            weight?: number;
        };
        relationships: {
            ruleSet: {
                data: {
                    type: GameCenterMatchmakingRuleCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterMatchmakingRuleCreateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULES = 'gameCenterMatchmakingRules',
    }
}

