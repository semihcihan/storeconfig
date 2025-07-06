/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type AppEncryptionDeclarationAppLinkageResponse = {
    data: {
        type: AppEncryptionDeclarationAppLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppEncryptionDeclarationAppLinkageResponse {
    export enum type {
        APPS = 'apps',
    }
}

