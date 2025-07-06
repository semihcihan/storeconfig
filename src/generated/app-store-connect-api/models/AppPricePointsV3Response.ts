/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppPricePointV3 } from './AppPricePointV3';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Territory } from './Territory';
export type AppPricePointsV3Response = {
    data: Array<AppPricePointV3>;
    included?: Array<(App | Territory)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

