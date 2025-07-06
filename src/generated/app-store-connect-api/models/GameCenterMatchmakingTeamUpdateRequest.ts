/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingTeamUpdateRequest = {
    data: {
        type: GameCenterMatchmakingTeamUpdateRequest.type;
        id: string;
        attributes?: {
            minPlayers?: number;
            maxPlayers?: number;
        };
    };
};
export namespace GameCenterMatchmakingTeamUpdateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_TEAMS = 'gameCenterMatchmakingTeams',
    }
}

