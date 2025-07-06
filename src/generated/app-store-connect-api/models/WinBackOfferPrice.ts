/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type WinBackOfferPrice = {
    type: WinBackOfferPrice.type;
    id: string;
    relationships?: {
        territory?: {
            data?: {
                type: WinBackOfferPrice.type;
                id: string;
            };
        };
        subscriptionPricePoint?: {
            data?: {
                type: WinBackOfferPrice.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace WinBackOfferPrice {
    export enum type {
        WIN_BACK_OFFER_PRICES = 'winBackOfferPrices',
    }
}

