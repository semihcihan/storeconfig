/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterChallengeVersionReleaseCreateRequest = {
    data: {
        type: GameCenterChallengeVersionReleaseCreateRequest.type;
        relationships: {
            gameCenterDetail: {
                data: {
                    type: GameCenterChallengeVersionReleaseCreateRequest.type;
                    id: string;
                };
            };
            version: {
                data: {
                    type: GameCenterChallengeVersionReleaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterChallengeVersionReleaseCreateRequest {
    export enum type {
        GAME_CENTER_CHALLENGE_VERSION_RELEASES = 'gameCenterChallengeVersionReleases',
    }
}

