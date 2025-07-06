/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppStoreVersion } from './AppStoreVersion';
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterAchievement } from './GameCenterAchievement';
import type { GameCenterAchievementRelease } from './GameCenterAchievementRelease';
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterActivityVersionRelease } from './GameCenterActivityVersionRelease';
import type { GameCenterAppVersion } from './GameCenterAppVersion';
import type { GameCenterChallenge } from './GameCenterChallenge';
import type { GameCenterChallengeVersionRelease } from './GameCenterChallengeVersionRelease';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterGroup } from './GameCenterGroup';
import type { GameCenterLeaderboard } from './GameCenterLeaderboard';
import type { GameCenterLeaderboardRelease } from './GameCenterLeaderboardRelease';
import type { GameCenterLeaderboardSet } from './GameCenterLeaderboardSet';
import type { GameCenterLeaderboardSetRelease } from './GameCenterLeaderboardSetRelease';
export type GameCenterDetailResponse = {
    data: GameCenterDetail;
    included?: Array<(App | GameCenterAppVersion | GameCenterGroup | GameCenterLeaderboard | GameCenterLeaderboardSet | GameCenterAchievement | GameCenterActivity | GameCenterChallenge | GameCenterAchievementRelease | GameCenterActivityVersionRelease | GameCenterChallengeVersionRelease | GameCenterLeaderboardRelease | GameCenterLeaderboardSetRelease | AppStoreVersion)>;
    links: DocumentLinks;
};

