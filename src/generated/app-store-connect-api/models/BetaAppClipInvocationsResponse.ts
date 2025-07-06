/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaAppClipInvocation } from './BetaAppClipInvocation';
import type { BetaAppClipInvocationLocalization } from './BetaAppClipInvocationLocalization';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
export type BetaAppClipInvocationsResponse = {
    data: Array<BetaAppClipInvocation>;
    included?: Array<BetaAppClipInvocationLocalization>;
    links: PagedDocumentLinks;
    meta?: PagingInformation;
};

