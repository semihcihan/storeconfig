/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleId } from './BundleId';
import type { Certificate } from './Certificate';
import type { Device } from './Device';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Profile } from './Profile';
export type ProfilesResponse = {
    data: Array<Profile>;
    included?: Array<(BundleId | Device | Certificate)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

