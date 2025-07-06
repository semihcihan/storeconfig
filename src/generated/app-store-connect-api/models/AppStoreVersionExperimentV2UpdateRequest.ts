/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionExperimentV2UpdateRequest = {
    data: {
        type: AppStoreVersionExperimentV2UpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            trafficProportion?: number;
            started?: boolean;
        };
    };
};
export namespace AppStoreVersionExperimentV2UpdateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENTS = 'appStoreVersionExperiments',
    }
}

