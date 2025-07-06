/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AppPriceV2 = {
    type: AppPriceV2.type;
    id: string;
    attributes?: {
        manual?: boolean;
        startDate?: string;
        endDate?: string;
    };
    relationships?: {
        appPricePoint?: {
            data?: {
                type: AppPriceV2.type;
                id: string;
            };
        };
        territory?: {
            data?: {
                type: AppPriceV2.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppPriceV2 {
    export enum type {
        APP_PRICES = 'appPrices',
    }
}

