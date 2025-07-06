/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamily } from './DeviceFamily';
export type AccessibilityDeclarationCreateRequest = {
    data: {
        type: AccessibilityDeclarationCreateRequest.type;
        attributes: {
            deviceFamily: DeviceFamily;
            supportsAudioDescriptions?: boolean;
            supportsCaptions?: boolean;
            supportsDarkInterface?: boolean;
            supportsDifferentiateWithoutColorAlone?: boolean;
            supportsLargerText?: boolean;
            supportsReducedMotion?: boolean;
            supportsSufficientContrast?: boolean;
            supportsVoiceControl?: boolean;
            supportsVoiceover?: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: AccessibilityDeclarationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AccessibilityDeclarationCreateRequest {
    export enum type {
        ACCESSIBILITY_DECLARATIONS = 'accessibilityDeclarations',
    }
}

