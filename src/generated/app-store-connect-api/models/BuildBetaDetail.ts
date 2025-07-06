/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExternalBetaState } from './ExternalBetaState';
import type { InternalBetaState } from './InternalBetaState';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BuildBetaDetail = {
    type: BuildBetaDetail.type;
    id: string;
    attributes?: {
        autoNotifyEnabled?: boolean;
        internalBuildState?: InternalBetaState;
        externalBuildState?: ExternalBetaState;
    };
    relationships?: {
        build?: {
            links?: RelationshipLinks;
            data?: {
                type: BuildBetaDetail.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BuildBetaDetail {
    export enum type {
        BUILD_BETA_DETAILS = 'buildBetaDetails',
    }
}

