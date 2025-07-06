/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppStoreVersionReleaseRequestCreateRequest = {
    data: {
        type: AppStoreVersionReleaseRequestCreateRequest.type;
        relationships: {
            appStoreVersion: {
                data: {
                    type: AppStoreVersionReleaseRequestCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppStoreVersionReleaseRequestCreateRequest {
    export enum type {
        APP_STORE_VERSION_RELEASE_REQUESTS = 'appStoreVersionReleaseRequests',
    }
}

