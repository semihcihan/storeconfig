/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PassTypeIdUpdateRequest = {
    data: {
        type: PassTypeIdUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
        };
    };
};
export namespace PassTypeIdUpdateRequest {
    export enum type {
        PASS_TYPE_IDS = 'passTypeIds',
    }
}

