/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { DocumentLinks } from './DocumentLinks';
import type { User } from './User';
export type UserResponse = {
    data: User;
    included?: Array<App>;
    links: DocumentLinks;
};

