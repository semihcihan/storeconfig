/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { UserInvitation } from './UserInvitation';
export type UserInvitationsResponse = {
    data: Array<UserInvitation>;
    included?: Array<App>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

