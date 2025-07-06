/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppCustomProductPageLocalizationInlineCreate = {
    type: AppCustomProductPageLocalizationInlineCreate.type;
    id?: string;
    attributes: {
        locale: string;
        promotionalText?: string;
    };
    relationships?: {
        appCustomProductPageVersion?: {
            data?: {
                type: AppCustomProductPageLocalizationInlineCreate.type;
                id: string;
            };
        };
    };
};
export namespace AppCustomProductPageLocalizationInlineCreate {
    export enum type {
        APP_CUSTOM_PRODUCT_PAGE_LOCALIZATIONS = 'appCustomProductPageLocalizations',
    }
}

