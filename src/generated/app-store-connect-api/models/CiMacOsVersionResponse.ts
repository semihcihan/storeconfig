/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiMacOsVersion } from './CiMacOsVersion';
import type { CiXcodeVersion } from './CiXcodeVersion';
import type { DocumentLinks } from './DocumentLinks';
export type CiMacOsVersionResponse = {
    data: CiMacOsVersion;
    included?: Array<CiXcodeVersion>;
    links: DocumentLinks;
};

