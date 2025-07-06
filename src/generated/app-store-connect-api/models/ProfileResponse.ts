/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BundleId } from './BundleId';
import type { Certificate } from './Certificate';
import type { Device } from './Device';
import type { DocumentLinks } from './DocumentLinks';
import type { Profile } from './Profile';
export type ProfileResponse = {
    data: Profile;
    included?: Array<(BundleId | Device | Certificate)>;
    links: DocumentLinks;
};

