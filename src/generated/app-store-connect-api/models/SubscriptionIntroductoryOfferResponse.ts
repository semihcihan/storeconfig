/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { Subscription } from './Subscription';
import type { SubscriptionIntroductoryOffer } from './SubscriptionIntroductoryOffer';
import type { SubscriptionPricePoint } from './SubscriptionPricePoint';
import type { Territory } from './Territory';
export type SubscriptionIntroductoryOfferResponse = {
    data: SubscriptionIntroductoryOffer;
    included?: Array<(Subscription | Territory | SubscriptionPricePoint)>;
    links: DocumentLinks;
};

