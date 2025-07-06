/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
import type { UserRole } from './UserRole';
export type UserInvitation = {
    type: UserInvitation.type;
    id: string;
    attributes?: {
        email?: string;
        firstName?: string;
        lastName?: string;
        expirationDate?: string;
        roles?: Array<UserRole>;
        allAppsVisible?: boolean;
        provisioningAllowed?: boolean;
    };
    relationships?: {
        visibleApps?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'apps';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace UserInvitation {
    export enum type {
        USER_INVITATIONS = 'userInvitations',
    }
}

