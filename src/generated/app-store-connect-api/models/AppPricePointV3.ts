/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppPricePointV3 = {
    type: AppPricePointV3.type;
    id: string;
    attributes?: {
        customerPrice?: string;
        proceeds?: string;
    };
    relationships?: {
        app?: {
            data?: {
                type: AppPricePointV3.type;
                id: string;
            };
        };
        equalizations?: {
            links?: RelationshipLinks;
        };
        territory?: {
            data?: {
                type: AppPricePointV3.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppPricePointV3 {
    export enum type {
        APP_PRICE_POINTS = 'appPricePoints',
    }
}

