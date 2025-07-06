/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterChallengeImage } from './GameCenterChallengeImage';
import type { GameCenterChallengeLocalization } from './GameCenterChallengeLocalization';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { GameCenterChallengeVersionRelease } from './GameCenterChallengeVersionRelease';
export type GameCenterChallengeVersionResponse = {
    data: GameCenterChallengeVersion;
    included?: Array<(GameCenterChallenge | GameCenterChallengeLocalization | GameCenterChallengeVersionRelease | GameCenterChallengeImage)>;
    links: DocumentLinks;
};

