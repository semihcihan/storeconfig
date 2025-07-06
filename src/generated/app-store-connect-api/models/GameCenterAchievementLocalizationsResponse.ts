/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterAchievementImage } from './GameCenterAchievementImage';
import type { GameCenterAchievementLocalization } from './GameCenterAchievementLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterAchievementLocalizationsResponse = {
    data: Array<GameCenterAchievementLocalization>;
    included?: Array<(GameCenterAchievement | GameCenterAchievementImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

