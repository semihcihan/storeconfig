/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEncryptionDeclarationDocumentCreateRequest = {
    data: {
        type: AppEncryptionDeclarationDocumentCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
        };
        relationships: {
            appEncryptionDeclaration: {
                data: {
                    type: AppEncryptionDeclarationDocumentCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppEncryptionDeclarationDocumentCreateRequest {
    export enum type {
        APP_ENCRYPTION_DECLARATION_DOCUMENTS = 'appEncryptionDeclarationDocuments',
    }
}

