/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActorResponse } from '../models/ActorResponse';
import type { ActorsResponse } from '../models/ActorsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActorsService {
    /**
     * @param filterId filter by id(s)
     * @param fieldsActors the fields to include for returned resources of type actors
     * @param limit maximum resources per page
     * @returns ActorsResponse List of Actors
     * @throws ApiError
     */
    public static actorsGetCollection(
        filterId: Array<string>,
        fieldsActors?: Array<'actorType' | 'userFirstName' | 'userLastName' | 'userEmail' | 'apiKeyId'>,
        limit?: number,
    ): CancelablePromise<ActorsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/actors',
            query: {
                'filter[id]': filterId,
                'fields[actors]': fieldsActors,
                'limit': limit,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param fieldsActors the fields to include for returned resources of type actors
     * @returns ActorResponse Single Actor
     * @throws ApiError
     */
    public static actorsGetInstance(
        id: string,
        fieldsActors?: Array<'actorType' | 'userFirstName' | 'userLastName' | 'userEmail' | 'apiKeyId'>,
    ): CancelablePromise<ActorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/actors/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[actors]': fieldsActors,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                429: `Rate limit exceeded error`,
            },
        });
    }
}
