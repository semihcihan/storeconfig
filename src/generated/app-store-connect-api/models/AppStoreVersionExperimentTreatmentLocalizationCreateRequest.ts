/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionExperimentTreatmentLocalizationCreateRequest = {
    data: {
        type: AppStoreVersionExperimentTreatmentLocalizationCreateRequest.type;
        attributes: {
            locale: string;
        };
        relationships: {
            appStoreVersionExperimentTreatment: {
                data: {
                    type: AppStoreVersionExperimentTreatmentLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionExperimentTreatmentLocalizationCreateRequest {
    export enum type {
        APP_STORE_VERSION_EXPERIMENT_TREATMENT_LOCALIZATIONS = 'appStoreVersionExperimentTreatmentLocalizations',
    }
}

