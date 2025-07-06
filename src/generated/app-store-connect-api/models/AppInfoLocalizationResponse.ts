/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppInfo } from './AppInfo';
import type { AppInfoLocalization } from './AppInfoLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppInfoLocalizationResponse = {
    data: AppInfoLocalization;
    included?: Array<AppInfo>;
    links: DocumentLinks;
};

