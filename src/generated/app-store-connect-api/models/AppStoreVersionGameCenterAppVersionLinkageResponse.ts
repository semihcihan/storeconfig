/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppStoreVersionGameCenterAppVersionLinkageResponse = {
    data: {
        type: AppStoreVersionGameCenterAppVersionLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppStoreVersionGameCenterAppVersionLinkageResponse {
    export enum type {
        GAME_CENTER_APP_VERSIONS = 'gameCenterAppVersions',
    }
}

