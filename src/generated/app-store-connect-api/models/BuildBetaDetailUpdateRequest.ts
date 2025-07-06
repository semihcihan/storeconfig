/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BuildBetaDetailUpdateRequest = {
    data: {
        type: BuildBetaDetailUpdateRequest.type;
        id: string;
        attributes?: {
            autoNotifyEnabled?: boolean;
        };
    };
};
export namespace BuildBetaDetailUpdateRequest {
    export enum type {
        BUILD_BETA_DETAILS = 'buildBetaDetails',
    }
}

