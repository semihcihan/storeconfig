/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterActivityImage } from './GameCenterActivityImage';
import type { GameCenterActivityLocalization } from './GameCenterActivityLocalization';
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
export type GameCenterActivityLocalizationResponse = {
    data: GameCenterActivityLocalization;
    included?: Array<(GameCenterActivityVersion | GameCenterActivityImage)>;
    links: DocumentLinks;
};

