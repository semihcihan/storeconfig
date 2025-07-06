/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MerchantIdCreateRequest = {
    data: {
        type: MerchantIdCreateRequest.type;
        attributes: {
            name: string;
            identifier: string;
        };
    };
};
export namespace MerchantIdCreateRequest {
    export enum type {
        MERCHANT_IDS = 'merchantIds',
    }
}

