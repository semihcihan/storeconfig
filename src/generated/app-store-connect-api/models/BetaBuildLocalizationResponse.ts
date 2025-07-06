/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BetaBuildLocalization } from './BetaBuildLocalization';
import type { Build } from './Build';
import type { DocumentLinks } from './DocumentLinks';
export type BetaBuildLocalizationResponse = {
    data: BetaBuildLocalization;
    included?: Array<Build>;
    links: DocumentLinks;
};

