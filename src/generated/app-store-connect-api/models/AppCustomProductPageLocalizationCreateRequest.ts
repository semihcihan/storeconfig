/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppCustomProductPageLocalizationCreateRequest = {
    data: {
        type: AppCustomProductPageLocalizationCreateRequest.type;
        attributes: {
            locale: string;
            promotionalText?: string;
        };
        relationships: {
            appCustomProductPageVersion: {
                data: {
                    type: AppCustomProductPageLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppCustomProductPageLocalizationCreateRequest {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGE_LOCALIZATIONS = 'appCustomProductPageLocalizations',
    }
}

