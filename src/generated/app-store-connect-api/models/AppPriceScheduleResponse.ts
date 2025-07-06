/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppPriceSchedule } from './AppPriceSchedule';
import type { AppPriceV2 } from './AppPriceV2';
import type { DocumentLinks } from './DocumentLinks';
import type { Territory } from './Territory';
export type AppPriceScheduleResponse = {
    data: AppPriceSchedule;
    included?: Array<(App | Territory | AppPriceV2)>;
    links: DocumentLinks;
};

