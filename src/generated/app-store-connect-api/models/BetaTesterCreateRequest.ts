/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaTesterCreateRequest = {
    data: {
        type: BetaTesterCreateRequest.type;
        attributes: {
            firstName?: string;
            lastName?: string;
            email: string;
        };
        relationships?: {
            betaGroups?: {
                data?: Array<{
                    type: 'betaGroups';
                    id: string;
                }>;
            };
            builds?: {
                data?: Array<{
                    type: 'builds';
                    id: string;
                }>;
            };
        };
    };
};
export namespace BetaTesterCreateRequest {
    export enum type {
        BETA_TESTERS = 'betaTesters',
    }
}

