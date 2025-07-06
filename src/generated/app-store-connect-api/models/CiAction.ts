/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildAudienceType } from './BuildAudienceType';
import type { CiActionType } from './CiActionType';
import type { CiTestDestination } from './CiTestDestination';
export type CiAction = {
    name?: string;
    actionType?: CiActionType;
    destination?: CiAction.destination;
    buildDistributionAudience?: BuildAudienceType;
    testConfiguration?: {
        kind?: CiAction.kind;
        testPlanName?: string;
        testDestinations?: Array<CiTestDestination>;
    };
    scheme?: string;
    platform?: CiAction.platform;
    isRequiredToPass?: boolean;
};
export namespace CiAction {
    export enum destination {
        ANY_IOS_DEVICE = 'ANY_IOS_DEVICE',
        ANY_IOS_SIMULATOR = 'ANY_IOS_SIMULATOR',
        ANY_TVOS_DEVICE = 'ANY_TVOS_DEVICE',
        ANY_TVOS_SIMULATOR = 'ANY_TVOS_SIMULATOR',
        ANY_WATCHOS_DEVICE = 'ANY_WATCHOS_DEVICE',
        ANY_WATCHOS_SIMULATOR = 'ANY_WATCHOS_SIMULATOR',
        ANY_MAC = 'ANY_MAC',
        ANY_MAC_CATALYST = 'ANY_MAC_CATALYST',
        ANY_VISIONOS_DEVICE = 'ANY_VISIONOS_DEVICE',
        ANY_VISIONOS_SIMULATOR = 'ANY_VISIONOS_SIMULATOR',
    }
    export enum kind {
        USE_SCHEME_SETTINGS = 'USE_SCHEME_SETTINGS',
        SPECIFIC_TEST_PLANS = 'SPECIFIC_TEST_PLANS',
    }
    export enum platform {
        MACOS = 'MACOS',
        IOS = 'IOS',
        TVOS = 'TVOS',
        WATCHOS = 'WATCHOS',
        VISIONOS = 'VISIONOS',
    }
}

