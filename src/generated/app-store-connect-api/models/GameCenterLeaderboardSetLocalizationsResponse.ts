/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetImage } from './GameCenterLeaderboardSetImage';
import type { GameCenterLeaderboardSetLocalization } from './GameCenterLeaderboardSetLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterLeaderboardSetLocalizationsResponse = {
    data: Array<GameCenterLeaderboardSetLocalization>;
    included?: Array<(GameCenterLeaderboardSet | GameCenterLeaderboardSetImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

