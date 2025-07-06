/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
export type GameCenterChallengeResponse = {
    data: GameCenterChallenge;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterChallengeVersion | GameCenterLeaderboard)>;
    links: DocumentLinks;
};

