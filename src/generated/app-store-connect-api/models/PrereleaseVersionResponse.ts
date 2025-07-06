/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
import type { PrereleaseVersion } from './PrereleaseVersion';
export type PrereleaseVersionResponse = {
    data: PrereleaseVersion;
    included?: Array<(Build | App)>;
    links: DocumentLinks;
};

