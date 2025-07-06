/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { SubscriptionGroup } from './SubscriptionGroup';
import type { SubscriptionGroupLocalization } from './SubscriptionGroupLocalization';
export type SubscriptionGroupLocalizationResponse = {
    data: SubscriptionGroupLocalization;
    included?: Array<SubscriptionGroup>;
    links: DocumentLinks;
};

