/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type Territory = {
    type: Territory.type;
    id: string;
    attributes?: {
        currency?: string;
    };
    links?: ResourceLinks;
};
export namespace Territory {
    export enum type {
        TERRITORIES = 'territories',
    }
}

