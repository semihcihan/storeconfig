/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaBuildLocalizationCreateRequest = {
    data: {
        type: BetaBuildLocalizationCreateRequest.type;
        attributes: {
            whatsNew?: string;
            locale: string;
        };
        relationships: {
            build: {
                data: {
                    type: BetaBuildLocalizationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BetaBuildLocalizationCreateRequest {
    export enum type {
        BETA_BUILD_LOCALIZATIONS = 'betaBuildLocalizations',
    }
}

