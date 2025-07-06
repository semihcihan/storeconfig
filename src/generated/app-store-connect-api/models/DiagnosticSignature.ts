/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiagnosticInsight } from './DiagnosticInsight';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type DiagnosticSignature = {
    type: DiagnosticSignature.type;
    id: string;
    attributes?: {
        diagnosticType?: DiagnosticSignature.diagnosticType;
        signature?: string;
        weight?: number;
        insight?: DiagnosticInsight;
    };
    relationships?: {
        logs?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace DiagnosticSignature {
    export enum type {
        DIAGNOSTIC_SIGNATURES = 'diagnosticSignatures',
    }
    export enum diagnosticType {
        DISK_WRITES = 'DISK_WRITES',
        HANGS = 'HANGS',
        LAUNCHES = 'LAUNCHES',
    }
}

