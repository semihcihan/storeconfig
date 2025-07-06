/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaAssetState } from './AppMediaAssetState';
import type { ResourceLinks } from './ResourceLinks';
import type { UploadOperation } from './UploadOperation';
export type AppEncryptionDeclarationDocument = {
    type: AppEncryptionDeclarationDocument.type;
    id: string;
    attributes?: {
        fileSize?: number;
        fileName?: string;
        assetToken?: string;
        downloadUrl?: string;
        sourceFileChecksum?: string;
        uploadOperations?: Array<UploadOperation>;
        assetDeliveryState?: AppMediaAssetState;
    };
    links?: ResourceLinks;
};
export namespace AppEncryptionDeclarationDocument {
    export enum type {
        APP_ENCRYPTION_DECLARATION_DOCUMENTS = 'appEncryptionDeclarationDocuments',
    }
}

