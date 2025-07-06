/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEvent } from './AppEvent';
import type { AppEventLocalization } from './AppEventLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppEventResponse = {
    data: AppEvent;
    included?: Array<AppEventLocalization>;
    links: DocumentLinks;
};

