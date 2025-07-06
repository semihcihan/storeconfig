/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeLocalizationUpdateRequest = {
    data: {
        type: GameCenterChallengeLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            description?: string;
        };
    };
};
export namespace GameCenterChallengeLocalizationUpdateRequest {
    export enum type {
        GAME_CENTER_CHALLENGE_LOCALIZATIONS = 'gameCenterChallengeLocalizations',
    }
}

