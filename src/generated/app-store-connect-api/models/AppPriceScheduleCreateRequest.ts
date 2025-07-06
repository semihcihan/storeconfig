/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPriceV2InlineCreate } from './AppPriceV2InlineCreate';
import type { TerritoryInlineCreate } from './TerritoryInlineCreate';
export type AppPriceScheduleCreateRequest = {
    data: {
        type: AppPriceScheduleCreateRequest.type;
        relationships: {
            app: {
                data: {
                    type: AppPriceScheduleCreateRequest.type;
                    id: string;
                };
            };
            baseTerritory: {
                data: {
                    type: AppPriceScheduleCreateRequest.type;
                    id: string;
                };
            };
            manualPrices: {
                data: Array<{
                    type: 'appPrices';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<(AppPriceV2InlineCreate | TerritoryInlineCreate)>;
};
export namespace AppPriceScheduleCreateRequest {
    export enum type {
        APP_PRICE_SCHEDULES = 'appPriceSchedules',
    }
}

