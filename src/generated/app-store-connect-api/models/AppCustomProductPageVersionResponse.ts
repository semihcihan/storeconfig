/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppCustomProductPage } from './AppCustomProductPage';
import type { AppCustomProductPageLocalization } from './AppCustomProductPageLocalization';
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { DocumentLinks } from './DocumentLinks';
export type AppCustomProductPageVersionResponse = {
    data: AppCustomProductPageVersion;
    included?: Array<(AppCustomProductPage | AppCustomProductPageLocalization)>;
    links: DocumentLinks;
};

