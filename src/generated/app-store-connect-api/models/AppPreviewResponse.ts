/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPreview } from './AppPreview';
import type { AppPreviewSet } from './AppPreviewSet';
import type { DocumentLinks } from './DocumentLinks';
export type AppPreviewResponse = {
    data: AppPreview;
    included?: Array<AppPreviewSet>;
    links: DocumentLinks;
};

