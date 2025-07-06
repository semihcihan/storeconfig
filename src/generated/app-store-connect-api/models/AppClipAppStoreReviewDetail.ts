/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AppClipAppStoreReviewDetail = {
    type: AppClipAppStoreReviewDetail.type;
    id: string;
    attributes?: {
        invocationUrls?: Array<string>;
    };
    relationships?: {
        appClipDefaultExperience?: {
            data?: {
                type: AppClipAppStoreReviewDetail.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppClipAppStoreReviewDetail {
    export enum type {
        APP_CLIP_APP_STORE_REVIEW_DETAILS = 'appClipAppStoreReviewDetails',
    }
}

