/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { Subscription } from './Subscription';
import type { SubscriptionSubmission } from './SubscriptionSubmission';
export type SubscriptionSubmissionResponse = {
    data: SubscriptionSubmission;
    included?: Array<Subscription>;
    links: DocumentLinks;
};

