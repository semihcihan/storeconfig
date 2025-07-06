/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetUploadFile } from './BackgroundAssetUploadFile';
import type { BackgroundAssetVersion } from './BackgroundAssetVersion';
import type { BackgroundAssetVersionInternalBetaRelease } from './BackgroundAssetVersionInternalBetaRelease';
import type { DocumentLinks } from './DocumentLinks';
export type BackgroundAssetVersionResponse = {
    data: BackgroundAssetVersion;
    included?: Array<(BackgroundAssetVersionInternalBetaRelease | BackgroundAssetUploadFile)>;
    links: DocumentLinks;
};

