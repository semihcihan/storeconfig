/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppEncryptionDeclaration } from './AppEncryptionDeclaration';
import type { AppEncryptionDeclarationDocument } from './AppEncryptionDeclarationDocument';
import type { Build } from './Build';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type AppEncryptionDeclarationsResponse = {
    data: Array<AppEncryptionDeclaration>;
    included?: Array<(App | Build | AppEncryptionDeclarationDocument)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

