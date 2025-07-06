/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { AppPricePointV3 } from './AppPricePointV3';
import type { DocumentLinks } from './DocumentLinks';
import type { Territory } from './Territory';
export type AppPricePointV3Response = {
    data: AppPricePointV3;
    included?: Array<(App | Territory)>;
    links: DocumentLinks;
};

