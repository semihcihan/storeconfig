/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterAchievementImage } from './GameCenterAchievementImage';
import type { GameCenterAchievementLocalization } from './GameCenterAchievementLocalization';
export type GameCenterAchievementLocalizationResponse = {
    data: GameCenterAchievementLocalization;
    included?: Array<(GameCenterAchievement | GameCenterAchievementImage)>;
    links: DocumentLinks;
};

