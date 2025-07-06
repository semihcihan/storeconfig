/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaBuildLocalizationUpdateRequest = {
    data: {
        type: BetaBuildLocalizationUpdateRequest.type;
        id: string;
        attributes?: {
            whatsNew?: string;
        };
    };
};
export namespace BetaBuildLocalizationUpdateRequest {
    export enum type {
        BETA_BUILD_LOCALIZATIONS = 'betaBuildLocalizations',
    }
}

