/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Actor } from './Actor';
import type { App } from './App';
import type { AppEvent } from './AppEvent';
import type { Nomination } from './Nomination';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Territory } from './Territory';
export type NominationsResponse = {
    data: Array<Nomination>;
    included?: Array<(App | Actor | AppEvent | Territory)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

