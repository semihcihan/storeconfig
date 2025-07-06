/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiagnosticInsightDirection } from './DiagnosticInsightDirection';
import type { DiagnosticInsightType } from './DiagnosticInsightType';
export type DiagnosticInsight = {
    insightType?: DiagnosticInsightType;
    direction?: DiagnosticInsightDirection;
    referenceVersions?: Array<{
        version?: string;
        value?: number;
    }>;
};

