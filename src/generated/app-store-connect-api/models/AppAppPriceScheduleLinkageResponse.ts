/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppAppPriceScheduleLinkageResponse = {
    data: {
        type: AppAppPriceScheduleLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppAppPriceScheduleLinkageResponse {
    export enum type {
        APP_PRICE_SCHEDULES = 'appPriceSchedules',
    }
}

