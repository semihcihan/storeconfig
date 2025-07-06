/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type GameCenterChallengeLocalization = {
    type: GameCenterChallengeLocalization.type;
    id: string;
    attributes?: {
        locale?: string;
        name?: string;
        description?: string;
    };
    relationships?: {
        version?: {
            data?: {
                type: GameCenterChallengeLocalization.type;
                id: string;
            };
        };
        image?: {
            links?: RelationshipLinks;
            data?: {
                type: GameCenterChallengeLocalization.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace GameCenterChallengeLocalization {
    export enum type {
        GAME_CENTER_CHALLENGE_LOCALIZATIONS = 'gameCenterChallengeLocalizations',
    }
}

