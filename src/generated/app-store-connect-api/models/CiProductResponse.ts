/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { App } from './App';
import type { BundleId } from './BundleId';
import type { CiProduct } from './CiProduct';
import type { DocumentLinks } from './DocumentLinks';
import type { ScmRepository } from './ScmRepository';
export type CiProductResponse = {
    data: CiProduct;
    included?: Array<(App | BundleId | ScmRepository)>;
    links: DocumentLinks;
};

