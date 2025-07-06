/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterDetailCreateRequest = {
    data: {
        type: GameCenterDetailCreateRequest.type;
        attributes?: {
            /**
             * @deprecated
             */
            challengeEnabled?: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: GameCenterDetailCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterDetailCreateRequest {
    export enum type {
        GAME_CENTER_DETAILS = 'gameCenterDetails',
    }
}

