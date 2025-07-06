/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
import type { GameCenterActivityVersionRelease } from './GameCenterActivityVersionRelease';
export type GameCenterActivityVersionReleaseResponse = {
    data: GameCenterActivityVersionRelease;
    included?: Array<GameCenterActivityVersion>;
    links: DocumentLinks;
};

