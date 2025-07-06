/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type InAppPurchaseV2ContentLinkageResponse = {
    data: {
        type: InAppPurchaseV2ContentLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace InAppPurchaseV2ContentLinkageResponse {
    export enum type {
        IN_APP_PURCHASE_CONTENTS = 'inAppPurchaseContents',
    }
}

