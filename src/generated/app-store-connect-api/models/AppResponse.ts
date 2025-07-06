/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppClip } from './AppClip';
import type { AppCustomProductPage } from './AppCustomProductPage';
import type { AppEncryptionDeclaration } from './AppEncryptionDeclaration';
import type { AppEvent } from './AppEvent';
import type { AppInfo } from './AppInfo';
import type { AppStoreVersion } from './AppStoreVersion';
import type { AppStoreVersionExperimentV2 } from './AppStoreVersionExperimentV2';
import type { BetaAppLocalization } from './BetaAppLocalization';
import type { BetaAppReviewDetail } from './BetaAppReviewDetail';
import type { BetaGroup } from './BetaGroup';
import type { BetaLicenseAgreement } from './BetaLicenseAgreement';
import type { Build } from './Build';
import type { CiProduct } from './CiProduct';
import type { DocumentLinks } from './DocumentLinks';
import type { EndUserLicenseAgreement } from './EndUserLicenseAgreement';
import type { GameCenterDetail } from './GameCenterDetail';
import type { GameCenterEnabledVersion } from './GameCenterEnabledVersion';
import type { InAppPurchase } from './InAppPurchase';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
import type { PrereleaseVersion } from './PrereleaseVersion';
import type { PromotedPurchase } from './PromotedPurchase';
import type { ReviewSubmission } from './ReviewSubmission';
import type { SubscriptionGracePeriod } from './SubscriptionGracePeriod';
import type { SubscriptionGroup } from './SubscriptionGroup';
export type AppResponse = {
    data: App;
    included?: Array<(AppEncryptionDeclaration | CiProduct | BetaGroup | AppStoreVersion | PrereleaseVersion | BetaAppLocalization | Build | BetaLicenseAgreement | BetaAppReviewDetail | AppInfo | AppClip | EndUserLicenseAgreement | InAppPurchase | SubscriptionGroup | GameCenterEnabledVersion | AppCustomProductPage | InAppPurchaseV2 | PromotedPurchase | AppEvent | ReviewSubmission | SubscriptionGracePeriod | GameCenterDetail | AppStoreVersionExperimentV2)>;
    links: DocumentLinks;
};

