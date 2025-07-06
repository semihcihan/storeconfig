/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingQueue } from './GameCenterMatchmakingQueue';
import type { GameCenterMatchmakingRule } from './GameCenterMatchmakingRule';
import type { GameCenterMatchmakingRuleSet } from './GameCenterMatchmakingRuleSet';
import type { GameCenterMatchmakingTeam } from './GameCenterMatchmakingTeam';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterMatchmakingRuleSetsResponse = {
    data: Array<GameCenterMatchmakingRuleSet>;
    included?: Array<(GameCenterMatchmakingTeam | GameCenterMatchmakingRule | GameCenterMatchmakingQueue)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

