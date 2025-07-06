/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageAsset } from './ImageAsset';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreVersionExperimentTreatment = {
    type: AppStoreVersionExperimentTreatment.type;
    id: string;
    attributes?: {
        name?: string;
        appIcon?: ImageAsset;
        appIconName?: string;
        promotedDate?: string;
    };
    relationships?: {
        appStoreVersionExperiment?: {
            data?: {
                type: AppStoreVersionExperimentTreatment.type;
                id: string;
            };
        };
        appStoreVersionExperimentV2?: {
            data?: {
                type: AppStoreVersionExperimentTreatment.type;
                id: string;
            };
        };
        appStoreVersionExperimentTreatmentLocalizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appStoreVersionExperimentTreatmentLocalizations';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreVersionExperimentTreatment {
    export enum type {
        APP_STORE_VERSION_EXPERIMENT_TREATMENTS = 'appStoreVersionExperimentTreatments',
    }
}

