/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaBuildLocalization = {
    type: BetaBuildLocalization.type;
    id: string;
    attributes?: {
        whatsNew?: string;
        locale?: string;
    };
    relationships?: {
        build?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaBuildLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace BetaBuildLocalization {
    export enum type {
        BETA_BUILD_LOCALIZATIONS = 'betaBuildLocalizations',
    }
}

