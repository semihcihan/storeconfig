/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityImageUpdateRequest = {
    data: {
        type: GameCenterActivityImageUpdateRequest.type;
        id: string;
        attributes?: {
            uploaded?: boolean;
        };
    };
};
export namespace GameCenterActivityImageUpdateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_IMAGES = 'gameCenterActivityImages',
    }
}

