/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type UserUpdateRequest = {
    data: {
        type: UserUpdateRequest.type;
        id: string;
        attributes?: {
            roles?: Array<UserRole>;
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
export namespace UserUpdateRequest {
    export enum type {
        USERS = 'users',
    }
}

