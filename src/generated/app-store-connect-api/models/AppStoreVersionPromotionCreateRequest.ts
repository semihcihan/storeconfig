/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionPromotionCreateRequest = {
    data: {
        type: AppStoreVersionPromotionCreateRequest.type;
        relationships: {
            appStoreVersion: {
                data: {
                    type: AppStoreVersionPromotionCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionExperimentTreatment: {
                data: {
                    type: AppStoreVersionPromotionCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionPromotionCreateRequest {
    export enum type {
        APP_STORE_VERSION_PROMOTIONS = 'appStoreVersionPromotions',
    }
}

