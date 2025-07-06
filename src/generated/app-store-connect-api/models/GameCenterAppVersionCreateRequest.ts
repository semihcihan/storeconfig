/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterAppVersionCreateRequest = {
    data: {
        type: GameCenterAppVersionCreateRequest.type;
        relationships: {
            appStoreVersion: {
                data: {
                    type: GameCenterAppVersionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterAppVersionCreateRequest {
    export enum type {
        GAME_CENTER_APP_VERSIONS = 'gameCenterAppVersions',
    }
}

