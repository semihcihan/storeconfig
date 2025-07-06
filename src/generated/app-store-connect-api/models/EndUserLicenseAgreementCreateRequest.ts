/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EndUserLicenseAgreementCreateRequest = {
    data: {
        type: EndUserLicenseAgreementCreateRequest.type;
        attributes: {
            agreementText: string;
        };
        relationships: {
            app: {
                data: {
                    type: EndUserLicenseAgreementCreateRequest.type;
                    id: string;
                };
            };
            territories: {
                data: Array<{
                    type: 'territories';
                    id: string;
                }>;
            };
        };
    };
};
export namespace EndUserLicenseAgreementCreateRequest {
    export enum type {
        END_USER_LICENSE_AGREEMENTS = 'endUserLicenseAgreements',
    }
}

