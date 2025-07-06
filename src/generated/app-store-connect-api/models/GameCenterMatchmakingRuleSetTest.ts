/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingTeamAssignment } from './GameCenterMatchmakingTeamAssignment';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterMatchmakingRuleSetTest = {
    type: GameCenterMatchmakingRuleSetTest.type;
    id: string;
    attributes?: {
        matchmakingResults?: Array<Array<{
            requestName?: string;
            teamAssignments?: Array<GameCenterMatchmakingTeamAssignment>;
        }>>;
    };
    links?: ResourceLinks;
};
export namespace GameCenterMatchmakingRuleSetTest {
    export enum type {
        GAME_CENTER_MATCHMAKING_RULE_SET_TESTS = 'gameCenterMatchmakingRuleSetTests',
    }
}

