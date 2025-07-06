/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PreviewType } from './PreviewType';
export type AppPreviewSetCreateRequest = {
    data: {
        type: AppPreviewSetCreateRequest.type;
        attributes: {
            previewType: PreviewType;
        };
        relationships?: {
            appStoreVersionLocalization?: {
                data?: {
                    type: AppPreviewSetCreateRequest.type;
                    id: string;
                };
            };
            appCustomProductPageLocalization?: {
                data?: {
                    type: AppPreviewSetCreateRequest.type;
                    id: string;
                };
            };
            appStoreVersionExperimentTreatmentLocalization?: {
                data?: {
                    type: AppPreviewSetCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppPreviewSetCreateRequest {
    export enum type {
        APP_PREVIEW_SETS = 'appPreviewSets',
    }
}

