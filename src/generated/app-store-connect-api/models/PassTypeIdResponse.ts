/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from './Certificate';
import type { DocumentLinks } from './DocumentLinks';
import type { PassTypeId } from './PassTypeId';
export type PassTypeIdResponse = {
    data: PassTypeId;
    included?: Array<Certificate>;
    links: DocumentLinks;
};

