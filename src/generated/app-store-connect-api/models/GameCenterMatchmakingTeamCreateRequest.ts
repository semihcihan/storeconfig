/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameCenterMatchmakingTeamCreateRequest = {
    data: {
        type: GameCenterMatchmakingTeamCreateRequest.type;
        attributes: {
            referenceName: string;
            minPlayers: number;
            maxPlayers: number;
        };
        relationships: {
            ruleSet: {
                data: {
                    type: GameCenterMatchmakingTeamCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace GameCenterMatchmakingTeamCreateRequest {
    export enum type {
        GAME_CENTER_MATCHMAKING_TEAMS = 'gameCenterMatchmakingTeams',
    }
}

