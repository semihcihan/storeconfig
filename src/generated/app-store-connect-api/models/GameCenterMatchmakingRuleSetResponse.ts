/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterMatchmakingQueue } from './GameCenterMatchmakingQueue';
import type { GameCenterMatchmakingRule } from './GameCenterMatchmakingRule';
import type { GameCenterMatchmakingRuleSet } from './GameCenterMatchmakingRuleSet';
import type { GameCenterMatchmakingTeam } from './GameCenterMatchmakingTeam';
export type GameCenterMatchmakingRuleSetResponse = {
    data: GameCenterMatchmakingRuleSet;
    included?: Array<(GameCenterMatchmakingTeam | GameCenterMatchmakingRule | GameCenterMatchmakingQueue)>;
    links: DocumentLinks;
};

