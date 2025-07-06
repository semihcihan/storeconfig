/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PassTypeIdCreateRequest = {
    data: {
        type: PassTypeIdCreateRequest.type;
        attributes: {
            name: string;
            identifier: string;
        };
    };
};
export namespace PassTypeIdCreateRequest {
    export enum type {
        PASS_TYPE_IDS = 'passTypeIds',
    }
}

