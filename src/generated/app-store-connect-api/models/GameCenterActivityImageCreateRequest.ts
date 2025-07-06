/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityImageCreateRequest = {
    data: {
        type: GameCenterActivityImageCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships?: {
            localization?: {
                data?: {
                    type: GameCenterActivityImageCreateRequest.type;
                    id: string;
                };
            };
            version?: {
                data?: {
                    type: GameCenterActivityImageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterActivityImageCreateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_IMAGES = 'gameCenterActivityImages',
    }
}

