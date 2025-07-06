/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { gzip } from '../models/gzip';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SalesReportsService {
    /**
     * @param filterVendorNumber filter by attribute 'vendorNumber'
     * @param filterReportType filter by attribute 'reportType'
     * @param filterReportSubType filter by attribute 'reportSubType'
     * @param filterFrequency filter by attribute 'frequency'
     * @param filterReportDate filter by attribute 'reportDate'
     * @param filterVersion filter by attribute 'version'
     * @returns gzip List of SalesReports
     * @throws ApiError
     */
    public static salesReportsGetCollection(
        filterVendorNumber: Array<string>,
        filterReportType: Array<'SALES' | 'PRE_ORDER' | 'NEWSSTAND' | 'SUBSCRIPTION' | 'SUBSCRIPTION_EVENT' | 'SUBSCRIBER' | 'SUBSCRIPTION_OFFER_CODE_REDEMPTION' | 'INSTALLS' | 'FIRST_ANNUAL' | 'WIN_BACK_ELIGIBILITY'>,
        filterReportSubType: Array<'SUMMARY' | 'DETAILED' | 'SUMMARY_INSTALL_TYPE' | 'SUMMARY_TERRITORY' | 'SUMMARY_CHANNEL'>,
        filterFrequency: Array<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>,
        filterReportDate?: Array<string>,
        filterVersion?: Array<string>,
    ): CancelablePromise<gzip> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/salesReports',
            query: {
                'filter[vendorNumber]': filterVendorNumber,
                'filter[reportType]': filterReportType,
                'filter[reportSubType]': filterReportSubType,
                'filter[frequency]': filterFrequency,
                'filter[reportDate]': filterReportDate,
                'filter[version]': filterVersion,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
}
