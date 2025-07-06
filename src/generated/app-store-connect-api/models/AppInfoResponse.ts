/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgeRatingDeclaration } from './AgeRatingDeclaration';
import type { App } from './App';
import type { AppCategory } from './AppCategory';
import type { AppInfo } from './AppInfo';
import type { AppInfoLocalization } from './AppInfoLocalization';
import type { DocumentLinks } from './DocumentLinks';
export type AppInfoResponse = {
    data: AppInfo;
    included?: Array<(App | AgeRatingDeclaration | AppInfoLocalization | AppCategory)>;
    links: DocumentLinks;
};

