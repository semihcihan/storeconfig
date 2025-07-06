/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaGroupCreateRequest = {
    data: {
        type: BetaGroupCreateRequest.type;
        attributes: {
            name: string;
            isInternalGroup?: boolean;
            hasAccessToAllBuilds?: boolean;
            publicLinkEnabled?: boolean;
            publicLinkLimitEnabled?: boolean;
            publicLinkLimit?: number;
            feedbackEnabled?: boolean;
        };
        relationships: {
            app: {
                data: {
                    type: BetaGroupCreateRequest.type;
                    id: string;
                };
            };
            builds?: {
                data?: Array<{
                    type: 'builds';
                    id: string;
                }>;
            };
            betaTesters?: {
                data?: Array<{
                    type: 'betaTesters';
                    id: string;
                }>;
            };
        };
    };
};
export namespace BetaGroupCreateRequest {
    export enum type {
        BETA_GROUPS = 'betaGroups',
    }
}

