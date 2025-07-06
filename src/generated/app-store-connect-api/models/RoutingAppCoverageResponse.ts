/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppStoreVersion } from './AppStoreVersion';
import type { DocumentLinks } from './DocumentLinks';
import type { RoutingAppCoverage } from './RoutingAppCoverage';
export type RoutingAppCoverageResponse = {
    data: RoutingAppCoverage;
    included?: Array<AppStoreVersion>;
    links: DocumentLinks;
};

