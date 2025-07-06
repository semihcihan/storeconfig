/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SandboxTestersClearPurchaseHistoryRequestV2CreateRequest = {
    data: {
        type: SandboxTestersClearPurchaseHistoryRequestV2CreateRequest.type;
        relationships: {
            sandboxTesters: {
                data: Array<{
                    type: 'sandboxTesters';
                    id: string;
                }>;
            };
        };
    };
};
export namespace SandboxTestersClearPurchaseHistoryRequestV2CreateRequest {
    export enum type {
        SANDBOX_TESTERS_CLEAR_PURCHASE_HISTORY_REQUEST = 'sandboxTestersClearPurchaseHistoryRequest',
    }
}

