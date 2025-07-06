/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Property } from './Property';
export type GameCenterMatchmakingTestPlayerPropertyInlineCreate = {
    type: GameCenterMatchmakingTestPlayerPropertyInlineCreate.type;
    id?: string;
    attributes: {
        playerId: string;
        properties?: Array<Property>;
    };
};
export namespace GameCenterMatchmakingTestPlayerPropertyInlineCreate {
    export enum type {
        GAME_CENTER_MATCHMAKING_TEST_PLAYER_PROPERTIES = 'gameCenterMatchmakingTestPlayerProperties',
    }
}

