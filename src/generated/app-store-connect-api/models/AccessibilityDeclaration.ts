/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceFamily } from './DeviceFamily';
import type { ResourceLinks } from './ResourceLinks';
export type AccessibilityDeclaration = {
    type: AccessibilityDeclaration.type;
    id: string;
    attributes?: {
        deviceFamily?: DeviceFamily;
        state?: AccessibilityDeclaration.state;
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
    links?: ResourceLinks;
};
export namespace AccessibilityDeclaration {
    export enum type {
        ACCESSIBILITY_DECLARATIONS = 'accessibilityDeclarations',
    }
    export enum state {
        DRAFT = 'DRAFT',
        PUBLISHED = 'PUBLISHED',
        REPLACED = 'REPLACED',
    }
}

