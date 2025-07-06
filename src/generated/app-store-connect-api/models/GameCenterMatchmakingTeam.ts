/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterMatchmakingTeam = {
    type: GameCenterMatchmakingTeam.type;
    id: string;
    attributes?: {
        referenceName?: string;
        minPlayers?: number;
        maxPlayers?: number;
    };
    links?: ResourceLinks;
};
export namespace GameCenterMatchmakingTeam {
    export enum type {
        GAME_CENTER_MATCHMAKING_TEAMS = 'gameCenterMatchmakingTeams',
    }
}

