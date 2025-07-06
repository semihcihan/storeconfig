/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeImageUpdateRequest = {
    data: {
        type: GameCenterChallengeImageUpdateRequest.type;
        id: string;
        attributes?: {
            uploaded?: boolean;
        };
    };
};
export namespace GameCenterChallengeImageUpdateRequest {
    export enum type {
        GAME_CENTER_CHALLENGE_IMAGES = 'gameCenterChallengeImages',
    }
}

