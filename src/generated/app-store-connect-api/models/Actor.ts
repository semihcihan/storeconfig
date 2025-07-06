/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type Actor = {
    type: Actor.type;
    id: string;
    attributes?: {
        actorType?: Actor.actorType;
        userFirstName?: string;
        userLastName?: string;
        userEmail?: string;
        apiKeyId?: string;
    };
    links?: ResourceLinks;
};
export namespace Actor {
    export enum type {
        ACTORS = 'actors',
    }
    export enum actorType {
        USER = 'USER',
        API_KEY = 'API_KEY',
        XCODE_CLOUD = 'XCODE_CLOUD',
        APPLE = 'APPLE',
    }
}

