/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterAchievementRelease } from './GameCenterAchievementRelease';
import type { GameCenterDetail } from './GameCenterDetail';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterAchievementReleasesResponse = {
    data: Array<GameCenterAchievementRelease>;
    included?: Array<(GameCenterDetail | GameCenterAchievement)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

