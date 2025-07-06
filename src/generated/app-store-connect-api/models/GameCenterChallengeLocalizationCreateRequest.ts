/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeLocalizationCreateRequest = {
    data: {
        type: GameCenterChallengeLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name: string;
            description?: string;
        };
        relationships: {
            version: {
                data: {
                    type: GameCenterChallengeLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterChallengeLocalizationCreateRequest {
    export enum type {
        GAME_CENTER_CHALLENGE_LOCALIZATIONS = 'gameCenterChallengeLocalizations',
    }
}

