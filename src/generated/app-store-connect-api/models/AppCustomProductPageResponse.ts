/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppCustomProductPage } from './AppCustomProductPage';
import type { AppCustomProductPageVersion } from './AppCustomProductPageVersion';
import type { DocumentLinks } from './DocumentLinks';
export type AppCustomProductPageResponse = {
    data: AppCustomProductPage;
    included?: Array<(App | AppCustomProductPageVersion)>;
    links: DocumentLinks;
};

