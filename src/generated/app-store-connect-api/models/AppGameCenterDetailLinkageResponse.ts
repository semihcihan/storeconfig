/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type AppGameCenterDetailLinkageResponse = {
    data: {
        type: AppGameCenterDetailLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace AppGameCenterDetailLinkageResponse {
    export enum type {
        GAME_CENTER_DETAILS = 'gameCenterDetails',
    }
}

