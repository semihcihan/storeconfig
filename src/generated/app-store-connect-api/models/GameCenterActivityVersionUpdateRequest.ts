/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityVersionUpdateRequest = {
    data: {
        type: GameCenterActivityVersionUpdateRequest.type;
        id: string;
        attributes?: {
            fallbackUrl?: string;
        };
    };
};
export namespace GameCenterActivityVersionUpdateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_VERSIONS = 'gameCenterActivityVersions',
    }
}

