/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { InAppPurchaseSubmission } from './InAppPurchaseSubmission';
import type { InAppPurchaseV2 } from './InAppPurchaseV2';
export type InAppPurchaseSubmissionResponse = {
    data: InAppPurchaseSubmission;
    included?: Array<InAppPurchaseV2>;
    links: DocumentLinks;
};

