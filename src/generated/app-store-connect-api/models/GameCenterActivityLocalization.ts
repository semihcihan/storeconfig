/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterActivityLocalization = {
    type: GameCenterActivityLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
        description?: string;
    };
    relationships?: {
        version?: {
            data?: {
                type: GameCenterActivityLocalization.type;
                id: string;
            };
        };
        image?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterActivityLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterActivityLocalization {
    export enum type {
        GAME_CENTER_ACTIVITY_LOCALIZATIONS = 'gameCenterActivityLocalizations',
    }
}

