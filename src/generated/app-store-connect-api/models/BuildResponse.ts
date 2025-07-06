/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppEncryptionDeclaration } from './AppEncryptionDeclaration';
import type { AppStoreVersion } from './AppStoreVersion';
import type { BetaAppReviewSubmission } from './BetaAppReviewSubmission';
import type { BetaBuildLocalization } from './BetaBuildLocalization';
import type { BetaGroup } from './BetaGroup';
import type { BetaTester } from './BetaTester';
import type { Build } from './Build';
import type { BuildBetaDetail } from './BuildBetaDetail';
import type { BuildBundle } from './BuildBundle';
import type { BuildIcon } from './BuildIcon';
import type { DocumentLinks } from './DocumentLinks';
import type { PrereleaseVersion } from './PrereleaseVersion';
export type BuildResponse = {
    data: Build;
    included?: Array<(PrereleaseVersion | BetaTester | BetaGroup | BetaBuildLocalization | AppEncryptionDeclaration | BetaAppReviewSubmission | App | BuildBetaDetail | AppStoreVersion | BuildIcon | BuildBundle)>;
    links: DocumentLinks;
};

