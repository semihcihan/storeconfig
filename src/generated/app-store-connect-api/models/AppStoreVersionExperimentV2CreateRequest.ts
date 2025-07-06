/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Platform } from './Platform';
export type AppStoreVersionExperimentV2CreateRequest = {
    data: {
        type: AppStoreVersionExperimentV2CreateRequest.type;
        attributes: {
            name: string;
            platform: Platform;
            trafficProportion: number;
        };
        relationships: {
            app: {
                data: {
                    type: AppStoreVersionExperimentV2CreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionExperimentV2CreateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENTS = 'appStoreVersionExperiments',
    }
}

