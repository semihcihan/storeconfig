/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BundleId } from './BundleId';
import type { CiProduct } from './CiProduct';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { ScmRepository } from './ScmRepository';
export type CiProductsResponse = {
    data: Array<CiProduct>;
    included?: Array<(App | BundleId | ScmRepository)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

