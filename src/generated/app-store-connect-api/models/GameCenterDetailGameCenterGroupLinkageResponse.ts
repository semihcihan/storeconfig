/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentLinks } from './DocumentLinks';
export type GameCenterDetailGameCenterGroupLinkageResponse = {
    data: {
        type: GameCenterDetailGameCenterGroupLinkageResponse.type;
        id: string;
    };
    links: DocumentLinks;
};
export namespace GameCenterDetailGameCenterGroupLinkageResponse {
    export enum type {
        GAME_CENTER_GROUPS = 'gameCenterGroups',
    }
}

