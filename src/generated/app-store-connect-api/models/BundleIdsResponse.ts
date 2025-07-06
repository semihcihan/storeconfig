/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BundleId } from './BundleId';
import type { BundleIdCapability } from './BundleIdCapability';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Profile } from './Profile';
export type BundleIdsResponse = {
    data: Array<BundleId>;
    included?: Array<(Profile | BundleIdCapability | App)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

