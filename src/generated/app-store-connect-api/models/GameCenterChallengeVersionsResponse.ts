/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterChallengeImage } from './GameCenterChallengeImage';
import type { GameCenterChallengeLocalization } from './GameCenterChallengeLocalization';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { GameCenterChallengeVersionRelease } from './GameCenterChallengeVersionRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterChallengeVersionsResponse = {
    data: Array<GameCenterChallengeVersion>;
    included?: Array<(GameCenterChallenge | GameCenterChallengeLocalization | GameCenterChallengeVersionRelease | GameCenterChallengeImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

