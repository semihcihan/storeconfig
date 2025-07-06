/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiagnosticLogCallStackNode } from './DiagnosticLogCallStackNode';
export type diagnosticLogs = {
    productData?: Array<{
        signatureId?: string;
        diagnosticInsights?: Array<{
            insightsURL?: string;
            insightsCategory?: string;
            insightsString?: string;
        }>;
        diagnosticLogs?: Array<{
            callStackTree?: Array<{
                callStackPerThread?: boolean;
                callStacks?: Array<{
                    callStackRootFrames?: Array<DiagnosticLogCallStackNode>;
                }>;
            }>;
            diagnosticMetaData?: {
                bundleId?: string;
                event?: string;
                osVersion?: string;
                appVersion?: string;
                writesCaused?: string;
                deviceType?: string;
                platformArchitecture?: string;
                eventDetail?: string;
                buildVersion?: string;
            };
        }>;
    }>;
    version?: string;
};

