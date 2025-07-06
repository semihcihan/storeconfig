/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppCustomProductPageUpdateRequest = {
    data: {
        type: AppCustomProductPageUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            visible?: boolean;
        };
    };
};
export namespace AppCustomProductPageUpdateRequest {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGES = 'appCustomProductPages',
    }
}

