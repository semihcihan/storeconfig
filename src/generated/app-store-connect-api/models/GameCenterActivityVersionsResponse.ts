/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivity } from './GameCenterActivity';
import type { GameCenterActivityImage } from './GameCenterActivityImage';
import type { GameCenterActivityLocalization } from './GameCenterActivityLocalization';
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
import type { GameCenterActivityVersionRelease } from './GameCenterActivityVersionRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterActivityVersionsResponse = {
    data: Array<GameCenterActivityVersion>;
    included?: Array<(GameCenterActivity | GameCenterActivityLocalization | GameCenterActivityImage | GameCenterActivityVersionRelease)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

