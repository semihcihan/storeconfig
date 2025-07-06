/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MerchantIdUpdateRequest = {
    data: {
        type: MerchantIdUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
        };
    };
};
export namespace MerchantIdUpdateRequest {
    export enum type {
        MERCHANT_IDS = 'merchantIds',
    }
}

