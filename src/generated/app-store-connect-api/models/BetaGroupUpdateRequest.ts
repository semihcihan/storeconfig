/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaGroupUpdateRequest = {
    data: {
        type: BetaGroupUpdateRequest.type;
        id: string;
        attributes?: {
            name?: string;
            publicLinkEnabled?: boolean;
            publicLinkLimitEnabled?: boolean;
            publicLinkLimit?: number;
            feedbackEnabled?: boolean;
            iosBuildsAvailableForAppleSiliconMac?: boolean;
            iosBuildsAvailableForAppleVision?: boolean;
        };
    };
};
export namespace BetaGroupUpdateRequest {
    export enum type {
        BETA_GROUPS = 'betaGroups',
    }
}

