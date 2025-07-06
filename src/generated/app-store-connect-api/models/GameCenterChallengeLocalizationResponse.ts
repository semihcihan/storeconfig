/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterChallengeImage } from './GameCenterChallengeImage';
import type { GameCenterChallengeLocalization } from './GameCenterChallengeLocalization';
import type { GameCenterChallengeVersion } from './GameCenterChallengeVersion';
export type GameCenterChallengeLocalizationResponse = {
    data: GameCenterChallengeLocalization;
    included?: Array<(GameCenterChallengeVersion | GameCenterChallengeImage)>;
    links: DocumentLinks;
};

