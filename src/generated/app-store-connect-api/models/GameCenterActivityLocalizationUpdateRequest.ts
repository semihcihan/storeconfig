/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterActivityLocalizationUpdateRequest = {
    data: {
        type: GameCenterActivityLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            description?: string;
        };
    };
};
export namespace GameCenterActivityLocalizationUpdateRequest {
    export enum type {
        GAME_CENTER_ACTIVITY_LOCALIZATIONS = 'gameCenterActivityLocalizations',
    }
}

