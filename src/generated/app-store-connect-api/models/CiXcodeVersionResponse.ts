/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiMacOsVersion } from './CiMacOsVersion';
import type { CiXcodeVersion } from './CiXcodeVersion';
import type { DocumentLinks } from './DocumentLinks';
export type CiXcodeVersionResponse = {
    data: CiXcodeVersion;
    included?: Array<CiMacOsVersion>;
    links: DocumentLinks;
};

