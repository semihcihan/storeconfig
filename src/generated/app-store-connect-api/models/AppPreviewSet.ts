/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { PreviewType } from './PreviewType';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppPreviewSet = {
    type: AppPreviewSet.type;
    id: string;
    attributes?: {
        previewType?: PreviewType;
    };
    relationships?: {
        appStoreVersionLocalization?: {
            data?: {
                type: AppPreviewSet.type;
                id: string;
            };
        };
        appCustomProductPageLocalization?: {
            data?: {
                type: AppPreviewSet.type;
                id: string;
            };
        };
        appStoreVersionExperimentTreatmentLocalization?: {
            data?: {
                type: AppPreviewSet.type;
                id: string;
            };
        };
        appPreviews?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appPreviews';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppPreviewSet {
    export enum type {
        APP_PREVIEW_SETS = 'appPreviewSets',
    }
}

