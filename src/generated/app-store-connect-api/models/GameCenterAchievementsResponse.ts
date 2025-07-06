/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterAchievementLocalization } from './GameCenterAchievementLocalization';
import type { GameCenterAchievementRelease } from './GameCenterAchievementRelease';
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterAchievementsResponse = {
    data: Array<GameCenterAchievement>;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterAchievement | GameCenterAchievementLocalization | GameCenterAchievementRelease | GameCenterActivity)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

