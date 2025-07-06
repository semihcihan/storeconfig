/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BuildUpdateRequest = {
    data: {
        type: BuildUpdateRequest.type;
        id: string;
        attributes?: {
            expired?: boolean;
            usesNonExemptEncryption?: boolean;
        };
        relationships?: {
            appEncryptionDeclaration?: {
                data?: {
                    type: BuildUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BuildUpdateRequest {
    export enum type {
        BUILDS = 'builds',
    }
}

