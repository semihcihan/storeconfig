/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CapabilityOption = {
    key?: CapabilityOption.key;
    name?: string;
    description?: string;
    enabledByDefault?: boolean;
    enabled?: boolean;
    supportsWildcard?: boolean;
};
export namespace CapabilityOption {
    export enum key {
        XCODE_5 = 'XCODE_5',
        XCODE_6 = 'XCODE_6',
        COMPLETE_PROTECTION = 'COMPLETE_PROTECTION',
        PROTECTED_UNLESS_OPEN = 'PROTECTED_UNLESS_OPEN',
        PROTECTED_UNTIL_FIRST_USER_AUTH = 'PROTECTED_UNTIL_FIRST_USER_AUTH',
        PRIMARY_APP_CONSENT = 'PRIMARY_APP_CONSENT',
    }
}

