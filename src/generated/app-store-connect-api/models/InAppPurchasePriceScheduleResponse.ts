/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchasePrice } from './InAppPurchasePrice';
import type { InAppPurchasePriceSchedule } from './InAppPurchasePriceSchedule';
import type { Territory } from './Territory';
export type InAppPurchasePriceScheduleResponse = {
    data: InAppPurchasePriceSchedule;
    included?: Array<(Territory | InAppPurchasePrice)>;
    links: DocumentLinks;
};

