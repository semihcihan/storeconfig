/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingQueueCreateRequest = {
    data: {
        type: GameCenterMatchmakingQueueCreateRequest.type;
        attributes: {
            referenceName: string;
            classicMatchmakingBundleIds?: Array<string>;
        };
        relationships: {
            ruleSet: {
                data: {
                    type: GameCenterMatchmakingQueueCreateRequest.type;
                    id: string;
                };
            };
            experimentRuleSet?: {
                data?: {
                    type: GameCenterMatchmakingQueueCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterMatchmakingQueueCreateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_QUEUES = 'gameCenterMatchmakingQueues',
    }
}

