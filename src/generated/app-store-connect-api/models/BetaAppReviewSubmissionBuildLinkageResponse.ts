/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type BetaAppReviewSubmissionBuildLinkageResponse = {
    data: {
        type: BetaAppReviewSubmissionBuildLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace BetaAppReviewSubmissionBuildLinkageResponse {
    export enum type {
        BUILDS = 'builds',
    }
}

