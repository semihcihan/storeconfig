/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersion } from './AppStoreVersion';
import type { GameCenterAppVersion } from './GameCenterAppVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type GameCenterAppVersionsResponse = {
    data: Array<GameCenterAppVersion>;
    included?: Array<(GameCenterAppVersion | AppStoreVersion)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

