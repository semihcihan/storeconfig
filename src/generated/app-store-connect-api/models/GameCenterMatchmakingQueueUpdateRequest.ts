/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingQueueUpdateRequest = {
    data: {
        type: GameCenterMatchmakingQueueUpdateRequest.type;
        id: string;
        attributes?: {
            classicMatchmakingBundleIds?: Array<string>;
        };
        relationships?: {
            ruleSet?: {
                data?: {
                    type: GameCenterMatchmakingQueueUpdateRequest.type;
                    id: string;
                };
            };
            experimentRuleSet?: {
                data?: {
                    type: GameCenterMatchmakingQueueUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterMatchmakingQueueUpdateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_QUEUES = 'gameCenterMatchmakingQueues',
    }
}

