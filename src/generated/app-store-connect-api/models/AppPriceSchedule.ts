/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppPriceSchedule = {
    type: AppPriceSchedule.type;
    id: string;
    relationships?: {
        app?: {
            data?: {
                type: AppPriceSchedule.type;
                id: string;
            };
        };
        baseTerritory?: {
            links?: RelationshipLinks;
            data?: {
                type: AppPriceSchedule.type;
                id: string;
            };
        };
        manualPrices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appPrices';
                id: string;
            }>;
        };
        automaticPrices?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appPrices';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppPriceSchedule {
    export enum type {
        APP_PRICE_SCHEDULES = 'appPriceSchedules',
    }
}

