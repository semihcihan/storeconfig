/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityVersionCreateRequest = {
    data: {
        type: GameCenterActivityVersionCreateRequest.type;
        attributes?: {
            fallbackUrl?: string;
        };
        relationships: {
            activity: {
                data: {
                    type: GameCenterActivityVersionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterActivityVersionCreateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_VERSIONS = 'gameCenterActivityVersions',
    }
}

