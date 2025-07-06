/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionExperimentTreatmentCreateRequest = {
    data: {
        type: AppStoreVersionExperimentTreatmentCreateRequest.type;
        attributes: {
            name: string;
            appIconName?: string;
        };
        relationships?: {
            appStoreVersionExperiment?: {
                data?: {
                    type: AppStoreVersionExperimentTreatmentCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionExperimentV2?: {
                data?: {
                    type: AppStoreVersionExperimentTreatmentCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionExperimentTreatmentCreateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENT_TREATMENTS = 'appStoreVersionExperimentTreatments',
    }
}

