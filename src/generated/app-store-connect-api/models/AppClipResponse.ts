/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppClip } from './AppClip';
import type { AppClipDefaultExperience } from './AppClipDefaultExperience';
import type { DocumentLinks } from './DocumentLinks';
export type AppClipResponse = {
    data: AppClip;
    included?: Array<(App | AppClipDefaultExperience)>;
    links: DocumentLinks;
};

