/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionExperimentTreatmentUpdateRequest = {
    data: {
        type: AppStoreVersionExperimentTreatmentUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            appIconName?: string;
        };
    };
};
export namespace AppStoreVersionExperimentTreatmentUpdateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENT_TREATMENTS = 'appStoreVersionExperimentTreatments',
    }
}

