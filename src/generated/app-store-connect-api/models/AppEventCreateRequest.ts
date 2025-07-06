/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEventCreateRequest = {
    data: {
        type: AppEventCreateRequest.type;
        attributes: {
            referenceName: string;
            badge?: AppEventCreateRequest.badge;
            deepLink?: string;
            purchaseRequirement?: string;
            primaryLocale?: string;
            priority?: AppEventCreateRequest.priority;
            purpose?: AppEventCreateRequest.purpose;
            territorySchedules?: Array<{
                territories?: Array<string>;
                publishStart?: string;
                eventStart?: string;
                eventEnd?: string;
            }>;
        };
        relationships: {
            app: {
                data: {
                    type: AppEventCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppEventCreateRequest {
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

