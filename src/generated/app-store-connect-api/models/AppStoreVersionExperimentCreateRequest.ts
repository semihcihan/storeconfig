/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * @deprecated
 */
export type AppStoreVersionExperimentCreateRequest = {
    data: {
        type: AppStoreVersionExperimentCreateRequest.type;
        attributes: {
            name: string;
            trafficProportion: number;
        };
        relationships: {
            appStoreVersion: {
                data: {
                    type: AppStoreVersionExperimentCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionExperimentCreateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENTS = 'appStoreVersionExperiments',
    }
}

