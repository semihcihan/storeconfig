/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppBetaAppReviewDetailLinkageResponse = {
    data: {
        type: AppBetaAppReviewDetailLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppBetaAppReviewDetailLinkageResponse {
    export enum type {
        BETA_APP_REVIEW_DETAILS = 'betaAppReviewDetails',
    }
}

