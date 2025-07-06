/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
/**
 * @deprecated
 */
export type AppStoreVersionAgeRatingDeclarationLinkageResponse = {
    data: {
        type: AppStoreVersionAgeRatingDeclarationLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppStoreVersionAgeRatingDeclarationLinkageResponse {
    export enum type {
        AGE_RATING_DECLARATIONS = 'ageRatingDeclarations',
    }
}

