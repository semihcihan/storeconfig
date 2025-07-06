/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClip } from './AppClip';
import type { AppClipAppStoreReviewDetail } from './AppClipAppStoreReviewDetail';
import type { AppClipDefaultExperience } from './AppClipDefaultExperience';
import type { AppClipDefaultExperienceLocalization } from './AppClipDefaultExperienceLocalization';
import type { AppStoreVersion } from './AppStoreVersion';
import type { DocumentLinks } from './DocumentLinks';
export type AppClipDefaultExperienceResponse = {
    data: AppClipDefaultExperience;
    included?: Array<(AppClip | AppStoreVersion | AppClipDefaultExperienceLocalization | AppClipAppStoreReviewDetail)>;
    links: DocumentLinks;
};

