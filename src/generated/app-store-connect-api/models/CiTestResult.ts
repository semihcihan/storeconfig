/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiTestStatus } from './CiTestStatus';
import type { FileLocation } from './FileLocation';
import type { ResourceLinks } from './ResourceLinks';
export type CiTestResult = {
    type: CiTestResult.type;
    id: string;
    attributes?: {
        className?: string;
        name?: string;
        status?: CiTestStatus;
        fileSource?: FileLocation;
        message?: string;
        destinationTestResults?: Array<{
            uuid?: string;
            deviceName?: string;
            osVersion?: string;
            status?: CiTestStatus;
            duration?: number;
        }>;
    };
    links?: ResourceLinks;
};
export namespace CiTestResult {
    export enum type {
        CI_TEST_RESULTS = 'ciTestResults',
    }
}

