/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAsset } from './BackgroundAsset';
import type { BackgroundAssetVersion } from './BackgroundAssetVersion';
import type { DocumentLinks } from './DocumentLinks';
export type BackgroundAssetResponse = {
    data: BackgroundAsset;
    included?: Array<BackgroundAssetVersion>;
    links: DocumentLinks;
};

