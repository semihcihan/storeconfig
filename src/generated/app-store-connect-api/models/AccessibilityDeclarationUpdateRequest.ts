/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AccessibilityDeclarationUpdateRequest = {
    data: {
        type: AccessibilityDeclarationUpdateRequest.type;
        id: string;
        attributes?: {
            publish?: boolean;
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
    };
};
export namespace AccessibilityDeclarationUpdateRequest {
    export enum type {
        ACCESSIBILITY_DECLARATIONS = 'accessibilityDeclarations',
    }
}

