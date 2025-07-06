/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { GameCenterChallengeVersionRelease } from './GameCenterChallengeVersionRelease';
export type GameCenterChallengeVersionReleaseResponse = {
    data: GameCenterChallengeVersionRelease;
    included?: Array<GameCenterChallengeVersion>;
    links: DocumentLinks;
};

