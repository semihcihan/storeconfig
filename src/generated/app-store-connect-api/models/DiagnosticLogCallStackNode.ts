/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DiagnosticLogCallStackNode = {
    sampleCount?: number;
    isBlameFrame?: boolean;
    symbolName?: string;
    insightsCategory?: string;
    offsetIntoSymbol?: string;
    binaryName?: string;
    fileName?: string;
    binaryUUID?: string;
    lineNumber?: string;
    address?: string;
    offsetIntoBinaryTextSegment?: string;
    rawFrame?: string;
    subFrames?: Array<DiagnosticLogCallStackNode>;
};

