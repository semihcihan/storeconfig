/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { GameCenterChallengeVersionRelease } from './GameCenterChallengeVersionRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterChallengeVersionReleasesResponse = {
    data: Array<GameCenterChallengeVersionRelease>;
    included?: Array<GameCenterChallengeVersion>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

