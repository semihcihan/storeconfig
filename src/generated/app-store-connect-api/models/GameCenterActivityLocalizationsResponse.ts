/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterActivityImage } from './GameCenterActivityImage';
import type { GameCenterActivityLocalization } from './GameCenterActivityLocalization';
import type { GameCenterActivityVersion } from './GameCenterActivityVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterActivityLocalizationsResponse = {
    data: Array<GameCenterActivityLocalization>;
    included?: Array<(GameCenterActivityVersion | GameCenterActivityImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

