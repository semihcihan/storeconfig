/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { gzip } from '../models/gzip';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FinanceReportsService {
    /**
     * @param filterVendorNumber filter by attribute 'vendorNumber'
     * @param filterReportType filter by attribute 'reportType'
     * @param filterRegionCode filter by attribute 'regionCode'
     * @param filterReportDate filter by attribute 'reportDate'
     * @returns gzip List of FinanceReports
     * @throws ApiError
     */
    public static financeReportsGetCollection(
        filterVendorNumber: Array<string>,
        filterReportType: Array<'FINANCIAL' | 'FINANCE_DETAIL'>,
        filterRegionCode: Array<string>,
        filterReportDate: Array<string>,
    ): CancelablePromise<gzip> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/financeReports',
            query: {
                'filter[vendorNumber]': filterVendorNumber,
                'filter[reportType]': filterReportType,
                'filter[regionCode]': filterRegionCode,
                'filter[reportDate]': filterReportDate,
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
