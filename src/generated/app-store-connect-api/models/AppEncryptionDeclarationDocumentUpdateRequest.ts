/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEncryptionDeclarationDocumentUpdateRequest = {
    data: {
        type: AppEncryptionDeclarationDocumentUpdateRequest.type;
        id: string;
        attributes?: {
            sourceFileChecksum?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppEncryptionDeclarationDocumentUpdateRequest {
    export enum type {
        APP_ENCRYPTION_DECLARATION_DOCUMENTS = 'appEncryptionDeclarationDocuments',
    }
}

