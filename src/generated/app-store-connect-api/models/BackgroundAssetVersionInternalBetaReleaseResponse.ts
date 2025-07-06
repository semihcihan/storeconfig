/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackgroundAssetVersion } from './BackgroundAssetVersion';
import type { BackgroundAssetVersionInternalBetaRelease } from './BackgroundAssetVersionInternalBetaRelease';
import type { DocumentLinks } from './DocumentLinks';
export type BackgroundAssetVersionInternalBetaReleaseResponse = {
    data: BackgroundAssetVersionInternalBetaRelease;
    included?: Array<BackgroundAssetVersion>;
    links: DocumentLinks;
};

