/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type CiProduct = {
    type: CiProduct.type;
    id: string;
    attributes?: {
        name?: string;
        createdDate?: string;
        productType?: CiProduct.productType;
    };
    relationships?: {
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: CiProduct.type;
                id: string;
            };
        };
        bundleId?: {
            data?: {
                type: CiProduct.type;
                id: string;
            };
        };
        workflows?: {
            links?: RelationshipLinks;
        };
        primaryRepositories?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'scmRepositories';
                id: string;
            }>;
        };
        additionalRepositories?: {
            links?: RelationshipLinks;
        };
        buildRuns?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace CiProduct {
    export enum type {
        CI_PRODUCTS = 'ciProducts',
    }
    export enum productType {
        APP = 'APP',
        FRAMEWORK = 'FRAMEWORK',
    }
}

