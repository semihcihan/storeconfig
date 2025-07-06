/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingQueue } from './GameCenterMatchmakingQueue';
import type { GameCenterMatchmakingRuleSet } from './GameCenterMatchmakingRuleSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterMatchmakingQueuesResponse = {
    data: Array<GameCenterMatchmakingQueue>;
    included?: Array<GameCenterMatchmakingRuleSet>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

