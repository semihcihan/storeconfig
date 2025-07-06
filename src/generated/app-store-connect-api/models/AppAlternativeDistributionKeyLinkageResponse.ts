/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppAlternativeDistributionKeyLinkageResponse = {
    data: {
        type: AppAlternativeDistributionKeyLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppAlternativeDistributionKeyLinkageResponse {
    export enum type {
        ALTERNATIVE_DISTRIBUTION_KEYS = 'alternativeDistributionKeys',
    }
}

