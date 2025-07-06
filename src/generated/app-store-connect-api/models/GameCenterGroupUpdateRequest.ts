/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterGroupUpdateRequest = {
    data: {
        type: GameCenterGroupUpdateRequest.type;
        id: string;
        attributes?: {
            referenceName?: string;
        };
    };
};
export namespace GameCenterGroupUpdateRequest {
    export enum type {
        GAME_CENTER_GROUPS = 'gameCenterGroups',
    }
}

