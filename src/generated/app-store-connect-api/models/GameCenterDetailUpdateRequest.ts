/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterDetailUpdateRequest = {
    data: {
        type: GameCenterDetailUpdateRequest.type;
        id: string;
        attributes?: {
            /**
             * @deprecated
             */
            challengeEnabled?: boolean;
        };
        relationships?: {
            gameCenterGroup?: {
                data?: {
                    type: GameCenterDetailUpdateRequest.type;
                    id: string;
                };
            };
            defaultLeaderboard?: {
                data?: {
                    type: GameCenterDetailUpdateRequest.type;
                    id: string;
                };
            };
            defaultGroupLeaderboard?: {
                data?: {
                    type: GameCenterDetailUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterDetailUpdateRequest {
    export enum type {
        GAME_CENTER_DETAILS = 'gameCenterDetails',
    }
}

