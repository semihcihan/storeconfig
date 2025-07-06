/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * @deprecated
 */
export type AppStoreVersionExperimentUpdateRequest = {
    data: {
        type: AppStoreVersionExperimentUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            trafficProportion?: number;
            started?: boolean;
        };
    };
};
export namespace AppStoreVersionExperimentUpdateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENTS = 'appStoreVersionExperiments',
    }
}

