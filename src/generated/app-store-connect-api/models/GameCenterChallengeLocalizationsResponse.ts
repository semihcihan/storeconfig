/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterChallengeImage } from './GameCenterChallengeImage';
import type { GameCenterChallengeLocalization } from './GameCenterChallengeLocalization';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterChallengeLocalizationsResponse = {
    data: Array<GameCenterChallengeLocalization>;
    included?: Array<(GameCenterChallengeVersion | GameCenterChallengeImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

