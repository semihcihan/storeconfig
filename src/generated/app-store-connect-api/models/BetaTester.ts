/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaInviteType } from './BetaInviteType';
import type { BetaTesterState } from './BetaTesterState';
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaTester = {
    type: BetaTester.type;
    id: string;
    attributes?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        inviteType?: BetaInviteType;
        state?: BetaTesterState;
    };
    relationships?: {
        apps?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'apps';
                id: string;
            }>;
        };
        betaGroups?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaGroups';
                id: string;
            }>;
        };
        builds?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'builds';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace BetaTester {
    export enum type {
        BETA_TESTERS = 'betaTesters',
    }
}

