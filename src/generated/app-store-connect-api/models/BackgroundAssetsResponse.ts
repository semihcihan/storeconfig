/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAsset } from './BackgroundAsset';
import type { BackgroundAssetVersion } from './BackgroundAssetVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BackgroundAssetsResponse = {
    data: Array<BackgroundAsset>;
    included?: Array<BackgroundAssetVersion>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

