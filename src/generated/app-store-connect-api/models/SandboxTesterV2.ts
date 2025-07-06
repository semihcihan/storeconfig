/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
import type { TerritoryCode } from './TerritoryCode';
export type SandboxTesterV2 = {
    type: SandboxTesterV2.type;
    id: string;
    attributes?: {
        firstName?: string;
        lastName?: string;
        acAccountName?: string;
        territory?: TerritoryCode;
        applePayCompatible?: boolean;
        interruptPurchases?: boolean;
        subscriptionRenewalRate?: SandboxTesterV2.subscriptionRenewalRate;
    };
    links?: ResourceLinks;
};
export namespace SandboxTesterV2 {
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

