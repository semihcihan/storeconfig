/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreReviewAttachmentCreateRequest = {
    data: {
        type: AppStoreReviewAttachmentCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            appStoreReviewDetail: {
                data: {
                    type: AppStoreReviewAttachmentCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreReviewAttachmentCreateRequest {
    export enum type {
        APP_STORE_REVIEW_ATTACHMENTS = 'appStoreReviewAttachments',
    }
}

