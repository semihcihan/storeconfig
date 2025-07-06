/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type AppEvent = {
    type: AppEvent.type;
    id: string;
    attributes?: {
        referenceName?: string;
        badge?: AppEvent.badge;
        eventState?: AppEvent.eventState;
        deepLink?: string;
        purchaseRequirement?: string;
        primaryLocale?: string;
        priority?: AppEvent.priority;
        purpose?: AppEvent.purpose;
        territorySchedules?: Array<{
            territories?: Array<string>;
            publishStart?: string;
            eventStart?: string;
            eventEnd?: string;
        }>;
        archivedTerritorySchedules?: Array<{
            territories?: Array<string>;
            publishStart?: string;
            eventStart?: string;
            eventEnd?: string;
        }>;
    };
    relationships?: {
        localizations?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'appEventLocalizations';
                id: string;
            }>;
        };
    };
    links?: ResourceLinks;
};
export namespace AppEvent {
    export enum type {
        APP_EVENTS = 'appEvents',
    }
    export enum badge {
        LIVE_EVENT = 'LIVE_EVENT',
        PREMIERE = 'PREMIERE',
        CHALLENGE = 'CHALLENGE',
        COMPETITION = 'COMPETITION',
        NEW_SEASON = 'NEW_SEASON',
        MAJOR_UPDATE = 'MAJOR_UPDATE',
        SPECIAL_EVENT = 'SPECIAL_EVENT',
    }
    export enum eventState {
        DRAFT = 'DRAFT',
        READY_FOR_REVIEW = 'READY_FOR_REVIEW',
        WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
        IN_REVIEW = 'IN_REVIEW',
        REJECTED = 'REJECTED',
        ACCEPTED = 'ACCEPTED',
        APPROVED = 'APPROVED',
        PUBLISHED = 'PUBLISHED',
        PAST = 'PAST',
        ARCHIVED = 'ARCHIVED',
    }
    export enum priority {
        HIGH = 'HIGH',
        NORMAL = 'NORMAL',
    }
    export enum purpose {
        APPROPRIATE_FOR_ALL_USERS = 'APPROPRIATE_FOR_ALL_USERS',
        ATTRACT_NEW_USERS = 'ATTRACT_NEW_USERS',
        KEEP_ACTIVE_USERS_INFORMED = 'KEEP_ACTIVE_USERS_INFORMED',
        BRING_BACK_LAPSED_USERS = 'BRING_BACK_LAPSED_USERS',
    }
}

