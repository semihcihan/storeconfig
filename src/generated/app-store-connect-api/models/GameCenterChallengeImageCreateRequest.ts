/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeImageCreateRequest = {
    data: {
        type: GameCenterChallengeImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships?: {
            localization?: {
                data?: {
                    type: GameCenterChallengeImageCreateRequest.type;
                    id: string;
                };
            };
            version?: {
                data?: {
                    type: GameCenterChallengeImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterChallengeImageCreateRequest {
    export enum type {
        GAME_CENTER_CHALLENGE_IMAGES = 'gameCenterChallengeImages',
    }
}

