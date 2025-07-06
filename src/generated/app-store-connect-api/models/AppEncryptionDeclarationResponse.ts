/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppEncryptionDeclaration } from './AppEncryptionDeclaration';
import type { AppEncryptionDeclarationDocument } from './AppEncryptionDeclarationDocument';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
export type AppEncryptionDeclarationResponse = {
    data: AppEncryptionDeclaration;
    included?: Array<(App | Build | AppEncryptionDeclarationDocument)>;
    links: DocumentLinks;
};

