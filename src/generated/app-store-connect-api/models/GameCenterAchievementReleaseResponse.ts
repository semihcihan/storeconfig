/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterAchievementRelease } from './GameCenterAchievementRelease';
import type { GameCenterDetail } from './GameCenterDetail';
export type GameCenterAchievementReleaseResponse = {
    data: GameCenterAchievementRelease;
    included?: Array<(GameCenterDetail | GameCenterAchievement)>;
    links: DocumentLinks;
};

