/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEncryptionDeclarationCreateRequest = {
    data: {
        type: AppEncryptionDeclarationCreateRequest.type;
        attributes: {
            appDescription: string;
            containsProprietaryCryptography: boolean;
            containsThirdPartyCryptography: boolean;
            availableOnFrenchStore: boolean;
        };
        relationships: {
            /**
             * @deprecated
             */
            app: {
                data: {
                    type: AppEncryptionDeclarationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppEncryptionDeclarationCreateRequest {
    export enum type {
        APP_ENCRYPTION_DECLARATIONS = 'appEncryptionDeclarations',
    }
}

