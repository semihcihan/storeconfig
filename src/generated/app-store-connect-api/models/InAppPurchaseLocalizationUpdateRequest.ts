/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InAppPurchaseLocalizationUpdateRequest = {
    data: {
        type: InAppPurchaseLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            description?: string;
        };
    };
};
export namespace InAppPurchaseLocalizationUpdateRequest {
    export enum type {
        IN_APP_PURCHASE_LOCALIZATIONS = 'inAppPurchaseLocalizations',
    }
}

