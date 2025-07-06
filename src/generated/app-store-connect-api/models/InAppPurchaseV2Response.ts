/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchaseAppStoreReviewScreenshot } from './InAppPurchaseAppStoreReviewScreenshot';
import type { InAppPurchaseAvailability } from './InAppPurchaseAvailability';
import type { InAppPurchaseContent } from './InAppPurchaseContent';
import type { InAppPurchaseImage } from './InAppPurchaseImage';
import type { InAppPurchaseLocalization } from './InAppPurchaseLocalization';
import type { InAppPurchasePricePoint } from './InAppPurchasePricePoint';
import type { InAppPurchasePriceSchedule } from './InAppPurchasePriceSchedule';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
import type { PromotedPurchase } from './PromotedPurchase';
export type InAppPurchaseV2Response = {
    data: InAppPurchaseV2;
    included?: Array<(InAppPurchaseLocalization | InAppPurchasePricePoint | InAppPurchaseContent | InAppPurchaseAppStoreReviewScreenshot | PromotedPurchase | InAppPurchasePriceSchedule | InAppPurchaseAvailability | InAppPurchaseImage)>;
    links: DocumentLinks;
};

