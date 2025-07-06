/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { DocumentLinks } from './DocumentLinks';
import type { UserInvitation } from './UserInvitation';
export type UserInvitationResponse = {
    data: UserInvitation;
    included?: Array<App>;
    links: DocumentLinks;
};

