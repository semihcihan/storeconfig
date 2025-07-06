/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAppVersionUpdateRequest = {
    data: {
        type: GameCenterAppVersionUpdateRequest.type;
        id: string;
        attributes?: {
            enabled?: boolean;
        };
    };
};
export namespace GameCenterAppVersionUpdateRequest {
    export enum type {
        GAME_CENTER_APP_VERSIONS = 'gameCenterAppVersions',
    }
}

