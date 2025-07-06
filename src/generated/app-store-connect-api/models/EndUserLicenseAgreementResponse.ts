/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { DocumentLinks } from './DocumentLinks';
import type { EndUserLicenseAgreement } from './EndUserLicenseAgreement';
import type { Territory } from './Territory';
export type EndUserLicenseAgreementResponse = {
    data: EndUserLicenseAgreement;
    included?: Array<(App | Territory)>;
    links: DocumentLinks;
};

