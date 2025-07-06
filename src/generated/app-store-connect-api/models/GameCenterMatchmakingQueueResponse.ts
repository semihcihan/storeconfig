/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterMatchmakingQueue } from './GameCenterMatchmakingQueue';
import type { GameCenterMatchmakingRuleSet } from './GameCenterMatchmakingRuleSet';
export type GameCenterMatchmakingQueueResponse = {
    data: GameCenterMatchmakingQueue;
    included?: Array<GameCenterMatchmakingRuleSet>;
    links: DocumentLinks;
};

