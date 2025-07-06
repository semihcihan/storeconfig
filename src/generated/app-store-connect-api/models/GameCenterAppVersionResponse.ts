/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersion } from './AppStoreVersion';
import type { DocumentLinks } from './DocumentLinks';
import type { GameCenterAppVersion } from './GameCenterAppVersion';
export type GameCenterAppVersionResponse = {
    data: GameCenterAppVersion;
    included?: Array<(GameCenterAppVersion | AppStoreVersion)>;
    links: DocumentLinks;
};

