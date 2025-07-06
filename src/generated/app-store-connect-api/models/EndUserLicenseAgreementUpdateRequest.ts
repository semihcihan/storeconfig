/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EndUserLicenseAgreementUpdateRequest = {
    data: {
        type: EndUserLicenseAgreementUpdateRequest.type;
        id: string;
        attributes?: {
            agreementText?: string;
        };
        relationships?: {
            territories?: {
                data?: Array<{
                    type: 'territories';
                    id: string;
                }>;
            };
        };
    };
};
export namespace EndUserLicenseAgreementUpdateRequest {
    export enum type {
        END_USER_LICENSE_AGREEMENTS = 'endUserLicenseAgreements',
    }
}

