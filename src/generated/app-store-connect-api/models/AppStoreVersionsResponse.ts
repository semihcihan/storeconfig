/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgeRatingDeclaration } from './AgeRatingDeclaration';
import type { AlternativeDistributionPackage } from './AlternativeDistributionPackage';
import type { App } from './App';
import type { AppClipDefaultExperience } from './AppClipDefaultExperience';
import type { AppStoreReviewDetail } from './AppStoreReviewDetail';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperiment } from './AppStoreVersionExperiment';
import type { AppStoreVersionExperimentV2 } from './AppStoreVersionExperimentV2';
import type { AppStoreVersionLocalization } from './AppStoreVersionLocalization';
import type { AppStoreVersionPhasedRelease } from './AppStoreVersionPhasedRelease';
import type { AppStoreVersionSubmission } from './AppStoreVersionSubmission';
import type { Build } from './Build';
import type { GameCenterAppVersion } from './GameCenterAppVersion';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { RoutingAppCoverage } from './RoutingAppCoverage';
export type AppStoreVersionsResponse = {
    data: Array<AppStoreVersion>;
    included?: Array<(App | AgeRatingDeclaration | AppStoreVersionLocalization | Build | AppStoreVersionPhasedRelease | GameCenterAppVersion | RoutingAppCoverage | AppStoreReviewDetail | AppStoreVersionSubmission | AppClipDefaultExperience | AppStoreVersionExperiment | AppStoreVersionExperimentV2 | AlternativeDistributionPackage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

