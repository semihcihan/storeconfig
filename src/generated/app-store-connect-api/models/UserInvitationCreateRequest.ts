/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type UserInvitationCreateRequest = {
    data: {
        type: UserInvitationCreateRequest.type;
        attributes: {
            email: string;
            firstName: string;
            lastName: string;
            roles: Array<UserRole>;
            allAppsVisible?: boolean;
            provisioningAllowed?: boolean;
        };
        relationships?: {
            visibleApps?: {
                data?: Array<{
                    type: 'apps';
                    id: string;
                }>;
            };
        };
    };
};
export namespace UserInvitationCreateRequest {
    export enum type {
        USER_INVITATIONS = 'userInvitations',
    }
}

