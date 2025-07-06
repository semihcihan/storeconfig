/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type PassTypeId = {
    type: PassTypeId.type;
    id: string;
    attributes?: {
        name?: string;
        identifier?: string;
    };
    relationships?: {
        certificates?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'certificates';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace PassTypeId {
    export enum type {
        PASS_TYPE_IDS = 'passTypeIds',
    }
}

