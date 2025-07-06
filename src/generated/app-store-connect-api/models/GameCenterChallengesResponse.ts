/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterChallengesResponse = {
    data: Array<GameCenterChallenge>;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterChallengeVersion | GameCenterLeaderboard)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

