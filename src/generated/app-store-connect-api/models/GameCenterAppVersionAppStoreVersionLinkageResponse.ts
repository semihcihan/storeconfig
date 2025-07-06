/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type GameCenterAppVersionAppStoreVersionLinkageResponse = {
    data: {
        type: GameCenterAppVersionAppStoreVersionLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace GameCenterAppVersionAppStoreVersionLinkageResponse {
    export enum type {
        APP_STORE_VERSIONS = 'appStoreVersions',
    }
}

