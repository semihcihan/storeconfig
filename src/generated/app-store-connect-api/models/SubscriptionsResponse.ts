/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { PromotedPurchase } from './PromotedPurchase';
import type { Subscription } from './Subscription';
import type { SubscriptionAppStoreReviewScreenshot } from './SubscriptionAppStoreReviewScreenshot';
import type { SubscriptionAvailability } from './SubscriptionAvailability';
import type { SubscriptionGroup } from './SubscriptionGroup';
import type { SubscriptionImage } from './SubscriptionImage';
import type { SubscriptionIntroductoryOffer } from './SubscriptionIntroductoryOffer';
import type { SubscriptionLocalization } from './SubscriptionLocalization';
import type { SubscriptionOfferCode } from './SubscriptionOfferCode';
import type { SubscriptionPrice } from './SubscriptionPrice';
import type { SubscriptionPromotionalOffer } from './SubscriptionPromotionalOffer';
import type { WinBackOffer } from './WinBackOffer';
export type SubscriptionsResponse = {
    data: Array<Subscription>;
    included?: Array<(SubscriptionLocalization | SubscriptionAppStoreReviewScreenshot | SubscriptionGroup | SubscriptionIntroductoryOffer | SubscriptionPromotionalOffer | SubscriptionOfferCode | SubscriptionPrice | PromotedPurchase | SubscriptionAvailability | WinBackOffer | SubscriptionImage)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

