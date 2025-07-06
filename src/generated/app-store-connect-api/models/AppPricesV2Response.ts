/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppPricePointV3 } from './AppPricePointV3';
import type { AppPriceV2 } from './AppPriceV2';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import type { Territory } from './Territory';
export type AppPricesV2Response = {
    data: Array<AppPriceV2>;
    included?: Array<(AppPricePointV3 | Territory)>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

