/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { ScmProviderType } from './ScmProviderType';
export type ScmProvider = {
    type: ScmProvider.type;
    id: string;
    attributes?: {
        scmProviderType?: ScmProviderType;
        url?: string;
    };
    relationships?: {
        repositories?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace ScmProvider {
    export enum type {
        SCM_PROVIDERS = 'scmProviders',
    }
}

