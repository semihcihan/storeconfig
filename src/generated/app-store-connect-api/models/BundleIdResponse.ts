/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BundleId } from './BundleId';
import type { BundleIdCapability } from './BundleIdCapability';
import type { DocumentLinks } from './DocumentLinks';
import type { Profile } from './Profile';
export type BundleIdResponse = {
    data: BundleId;
    included?: Array<(Profile | BundleIdCapability | App)>;
    links: DocumentLinks;
};

