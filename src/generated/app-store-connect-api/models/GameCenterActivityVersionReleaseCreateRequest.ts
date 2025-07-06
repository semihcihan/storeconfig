/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityVersionReleaseCreateRequest = {
    data: {
        type: GameCenterActivityVersionReleaseCreateRequest.type;
        relationships: {
            gameCenterDetail: {
                data: {
                    type: GameCenterActivityVersionReleaseCreateRequest.type;
                    id: string;
                };
            };
            version: {
                data: {
                    type: GameCenterActivityVersionReleaseCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterActivityVersionReleaseCreateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_VERSION_RELEASES = 'gameCenterActivityVersionReleases',
    }
}

