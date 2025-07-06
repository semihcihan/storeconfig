/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingRuleUpdateRequest = {
    data: {
        type: GameCenterMatchmakingRuleUpdateRequest.type;
        id: string;
        attributes?: {
            description?: string;
            expression?: string;
            weight?: number;
        };
    };
};
export namespace GameCenterMatchmakingRuleUpdateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULES = 'gameCenterMatchmakingRules',
    }
}

