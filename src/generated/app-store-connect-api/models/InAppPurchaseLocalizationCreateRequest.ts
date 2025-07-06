/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseLocalizationCreateRequest = {
    data: {
        type: InAppPurchaseLocalizationCreateRequest.type;
        attributes: {
            name: string;
            locale: string;
            description?: string;
        };
        relationships: {
            inAppPurchaseV2: {
                data: {
                    type: InAppPurchaseLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace InAppPurchaseLocalizationCreateRequest {
    export enum type {
        IN_APP_PURCHASE_LOCALIZATIONS = 'inAppPurchaseLocalizations',
    }
}

