/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
import type { Subscription } from './Subscription';
import type { SubscriptionGroup } from './SubscriptionGroup';
import type { SubscriptionGroupLocalization } from './SubscriptionGroupLocalization';
export type SubscriptionGroupResponse = {
    data: SubscriptionGroup;
    included?: Array<(Subscription | SubscriptionGroupLocalization)>;
    links: DocumentLinks;
};

