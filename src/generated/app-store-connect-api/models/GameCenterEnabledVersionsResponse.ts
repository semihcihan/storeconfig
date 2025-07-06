/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { GameCenterEnabledVersion } from './GameCenterEnabledVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
/**
 * @deprecated
 */
export type GameCenterEnabledVersionsResponse = {
    data: Array<GameCenterEnabledVersion>;
    included?: Array<(GameCenterEnabledVersion | App)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

