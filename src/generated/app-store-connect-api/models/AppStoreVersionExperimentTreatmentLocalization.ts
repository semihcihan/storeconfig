/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppStoreVersionExperimentTreatmentLocalization = {
    type: AppStoreVersionExperimentTreatmentLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
    };
    relationships?: {
        appStoreVersionExperimentTreatment?: {
            data?: {
                type: AppStoreVersionExperimentTreatmentLocalization.type;
                id: string;
            };
        };
        appScreenshotSets?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appScreenshotSets';
                id: string;
            }>;
        };
        appPreviewSets?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appPreviewSets';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppStoreVersionExperimentTreatmentLocalization {
    export enum type {
        APP_STORE_VERSION_EXPERIMENT_TREATMENT_LOCALIZATIONS = 'appStoreVersionExperimentTreatmentLocalizations',
    }
}

