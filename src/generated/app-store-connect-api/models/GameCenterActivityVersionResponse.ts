/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterActivityImage } from './GameCenterActivityImage';
import type { GameCenterActivityLocalization } from './GameCenterActivityLocalization';
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
import type { GameCenterActivityVersionRelease } from './GameCenterActivityVersionRelease';
export type GameCenterActivityVersionResponse = {
    data: GameCenterActivityVersion;
    included?: Array<(GameCenterActivity | GameCenterActivityLocalization | GameCenterActivityImage | GameCenterActivityVersionRelease)>;
    links: DocumentLinks;
};

