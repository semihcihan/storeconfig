/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityLocalizationCreateRequest = {
    data: {
        type: GameCenterActivityLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            name: string;
            description?: string;
        };
        relationships: {
            version: {
                data: {
                    type: GameCenterActivityLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterActivityLocalizationCreateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_LOCALIZATIONS = 'gameCenterActivityLocalizations',
    }
}

