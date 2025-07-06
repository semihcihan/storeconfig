/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type AppClipDomainStatus = {
    type: AppClipDomainStatus.type;
    id: string;
    attributes?: {
        domains?: Array<{
            domain?: string;
            isValid?: boolean;
            lastUpdatedDate?: string;
            errorCode?: 'BAD_HTTP_RESPONSE' | 'BAD_JSON_CONTENT' | 'BAD_PKCS7_SIGNATURE' | 'CANNOT_REACH_AASA_FILE' | 'CROSS_SITE_REDIRECTS_FORBIDDEN' | 'DNS_ERROR' | 'INSECURE_REDIRECTS_FORBIDDEN' | 'INVALID_ENTITLEMENT_MISSING_SECTION' | 'INVALID_ENTITLEMENT_SYNTAX_ERROR' | 'INVALID_ENTITLEMENT_UNHANDLED_SECTION' | 'INVALID_ENTITLEMENT_UNKNOWN_ID' | 'NETWORK_ERROR' | 'NETWORK_ERROR_TEMPORARY' | 'OTHER_ERROR' | 'TIMEOUT' | 'TLS_ERROR' | 'TOO_MANY_REDIRECTS' | 'UNEXPECTED_ERROR';
        }>;
        lastUpdatedDate?: string;
    };
    links?: ResourceLinks;
};
export namespace AppClipDomainStatus {
    export enum type {
        APP_CLIP_DOMAIN_STATUSES = 'appClipDomainStatuses',
    }
}

