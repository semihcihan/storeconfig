/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEncryptionDeclarationState } from './AppEncryptionDeclarationState';
import type { PagingInformation } from './PagingInformation';
import type { Platform } from './Platform';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppEncryptionDeclaration = {
    type: AppEncryptionDeclaration.type;
    id: string;
    attributes?: {
        appDescription?: string;
        createdDate?: string;
        /**
         * @deprecated
         */
        usesEncryption?: boolean;
        exempt?: boolean;
        containsProprietaryCryptography?: boolean;
        containsThirdPartyCryptography?: boolean;
        availableOnFrenchStore?: boolean;
        /**
         * @deprecated
         */
        platform?: Platform;
        /**
         * @deprecated
         */
        uploadedDate?: string;
        /**
         * @deprecated
         */
        documentUrl?: string;
        /**
         * @deprecated
         */
        documentName?: string;
        /**
         * @deprecated
         */
        documentType?: string;
        appEncryptionDeclarationState?: AppEncryptionDeclarationState;
        codeValue?: string;
    };
    relationships?: {
        /**
         * @deprecated
         */
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: AppEncryptionDeclaration.type;
                id: string;
            };
        };
        /**
         * @deprecated
         */
        builds?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'builds';
                id: string;
            }>;
        };
        appEncryptionDeclarationDocument?: {
            links?: RelationshipLinks;
            data?: {
                type: AppEncryptionDeclaration.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace AppEncryptionDeclaration {
    export enum type {
        APP_ENCRYPTION_DECLARATIONS = 'appEncryptionDeclarations',
    }
}

