/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
export type GameCenterActivityResponse = {
    data: GameCenterActivity;
    included?: Array<(GameCenterDetail | GameCenterGroup | GameCenterAchievement | GameCenterLeaderboard | GameCenterActivityVersion)>;
    links: DocumentLinks;
};

