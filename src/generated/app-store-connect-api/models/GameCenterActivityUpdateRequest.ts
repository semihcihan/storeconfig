/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterActivityUpdateRequest = {
    data: {
        type: GameCenterActivityUpdateRequest.type;
        id: string;
        attributes?: {
            referenceName?: string;
            playStyle?: GameCenterActivityUpdateRequest.playStyle;
            minimumPlayersCount?: number;
            maximumPlayersCount?: number;
            supportsPartyCode?: boolean;
            archived?: boolean;
            properties?: StringToStringMap;
        };
    };
};
export namespace GameCenterActivityUpdateRequest {
    export enum type {
        GAME_CENTER_ACTIVITIES = 'gameCenterActivities',
    }
    export enum playStyle {
        ASYNCHRONOUS = 'ASYNCHRONOUS',
        SYNCHRONOUS = 'SYNCHRONOUS',
    }
}

