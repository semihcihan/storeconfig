/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DeviceUpdateRequest = {
    data: {
        type: DeviceUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            status?: DeviceUpdateRequest.status;
        };
    };
};
export namespace DeviceUpdateRequest {
    export enum type {
        DEVICES = 'devices',
    }
    export enum status {
        ENABLED = 'ENABLED',
        DISABLED = 'DISABLED',
    }
}

