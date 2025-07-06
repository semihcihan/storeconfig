/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StringToStringMap } from './StringToStringMap';
export type GameCenterActivityCreateRequest = {
    data: {
        type: GameCenterActivityCreateRequest.type;
        attributes: {
            referenceName: string;
            vendorIdentifier: string;
            playStyle?: GameCenterActivityCreateRequest.playStyle;
            minimumPlayersCount?: number;
            maximumPlayersCount?: number;
            supportsPartyCode?: boolean;
            properties?: StringToStringMap;
        };
        relationships?: {
            gameCenterDetail?: {
                data?: {
                    type: GameCenterActivityCreateRequest.type;
                    id: string;
                };
            };
            gameCenterGroup?: {
                data?: {
                    type: GameCenterActivityCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterActivityCreateRequest {
    export enum type {
        GAME_CENTER_ACTIVITIES = 'gameCenterActivities',
    }
    export enum playStyle {
        ASYNCHRONOUS = 'ASYNCHRONOUS',
        SYNCHRONOUS = 'SYNCHRONOUS',
    }
}

