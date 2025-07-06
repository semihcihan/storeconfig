/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetUploadFile } from './BackgroundAssetUploadFile';
import type { BackgroundAssetVersion } from './BackgroundAssetVersion';
import type { BackgroundAssetVersionInternalBetaRelease } from './BackgroundAssetVersionInternalBetaRelease';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BackgroundAssetVersionsResponse = {
    data: Array<BackgroundAssetVersion>;
    included?: Array<(BackgroundAssetVersionInternalBetaRelease | BackgroundAssetUploadFile)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

