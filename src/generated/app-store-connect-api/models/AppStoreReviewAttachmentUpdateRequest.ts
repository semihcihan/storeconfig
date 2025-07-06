/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreReviewAttachmentUpdateRequest = {
    data: {
        type: AppStoreReviewAttachmentUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppStoreReviewAttachmentUpdateRequest {
    export enum type {
        APP_STORE_REVIEW_ATTACHMENTS = 'appStoreReviewAttachments',
    }
}

