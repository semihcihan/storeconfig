/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppCustomProductPageVersionCreateRequest = {
    data: {
        type: AppCustomProductPageVersionCreateRequest.type;
        attributes?: {
            deepLink?: string;
        };
        relationships: {
            appCustomProductPage: {
                data: {
                    type: AppCustomProductPageVersionCreateRequest.type;
                    id: string;
                };
            };
            appCustomProductPageLocalizations?: {
                data?: Array<{
                    type: 'appCustomProductPageLocalizations';
                    id: string;
                }>;
            };
        };
    };
};
export namespace AppCustomProductPageVersionCreateRequest {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGE_VERSIONS = 'appCustomProductPageVersions',
    }
}

