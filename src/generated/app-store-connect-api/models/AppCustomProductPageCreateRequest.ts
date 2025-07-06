/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPageLocalizationInlineCreate } from './AppCustomProductPageLocalizationInlineCreate';
import type { AppCustomProductPageVersionInlineCreate } from './AppCustomProductPageVersionInlineCreate';
export type AppCustomProductPageCreateRequest = {
    data: {
        type: AppCustomProductPageCreateRequest.type;
        attributes: {
            name: string;
        };
        relationships: {
            app: {
                data: {
                    type: AppCustomProductPageCreateRequest.type;
                    id: string;
                };
            };
            appCustomProductPageVersions?: {
                data?: Array<{
                    type: 'appCustomProductPageVersions';
                    id: string;
                }>;
            };
            appStoreVersionTemplate?: {
                data?: {
                    type: AppCustomProductPageCreateRequest.type;
                    id: string;
                };
            };
            customProductPageTemplate?: {
                data?: {
                    type: AppCustomProductPageCreateRequest.type;
                    id: string;
                };
            };
        };
    };
    included?: Array<(AppCustomProductPageLocalizationInlineCreate | AppCustomProductPageVersionInlineCreate)>;
};
export namespace AppCustomProductPageCreateRequest {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGES = 'appCustomProductPages',
    }
}

