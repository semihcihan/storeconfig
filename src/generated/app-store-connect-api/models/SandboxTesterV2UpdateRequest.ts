/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TerritoryCode } from './TerritoryCode';
export type SandboxTesterV2UpdateRequest = {
    data: {
        type: SandboxTesterV2UpdateRequest.type;
        id: string;
        attributes?: {
            territory?: TerritoryCode;
            interruptPurchases?: boolean;
            subscriptionRenewalRate?: SandboxTesterV2UpdateRequest.subscriptionRenewalRate;
        };
    };
};
export namespace SandboxTesterV2UpdateRequest {
    export enum type {
        SANDBOX_TESTERS = 'sandboxTesters',
    }
    export enum subscriptionRenewalRate {
        MONTHLY_RENEWAL_EVERY_ONE_HOUR = 'MONTHLY_RENEWAL_EVERY_ONE_HOUR',
        MONTHLY_RENEWAL_EVERY_THIRTY_MINUTES = 'MONTHLY_RENEWAL_EVERY_THIRTY_MINUTES',
        MONTHLY_RENEWAL_EVERY_FIFTEEN_MINUTES = 'MONTHLY_RENEWAL_EVERY_FIFTEEN_MINUTES',
        MONTHLY_RENEWAL_EVERY_FIVE_MINUTES = 'MONTHLY_RENEWAL_EVERY_FIVE_MINUTES',
        MONTHLY_RENEWAL_EVERY_THREE_MINUTES = 'MONTHLY_RENEWAL_EVERY_THREE_MINUTES',
    }
}

