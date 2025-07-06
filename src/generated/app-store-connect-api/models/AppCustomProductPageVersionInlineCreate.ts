/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppCustomProductPageVersionInlineCreate = {
    type: AppCustomProductPageVersionInlineCreate.type;
    id?: string;
    attributes?: {
        deepLink?: string;
    };
    relationships?: {
        appCustomProductPage?: {
            data?: {
                type: AppCustomProductPageVersionInlineCreate.type;
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
export namespace AppCustomProductPageVersionInlineCreate {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGE_VERSIONS = 'appCustomProductPageVersions',
    }
}

