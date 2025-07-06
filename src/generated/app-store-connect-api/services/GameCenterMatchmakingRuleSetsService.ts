/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameCenterMatchmakingQueuesResponse } from '../models/GameCenterMatchmakingQueuesResponse';
import type { GameCenterMatchmakingRuleSetCreateRequest } from '../models/GameCenterMatchmakingRuleSetCreateRequest';
import type { GameCenterMatchmakingRuleSetMatchmakingQueuesLinkagesResponse } from '../models/GameCenterMatchmakingRuleSetMatchmakingQueuesLinkagesResponse';
import type { GameCenterMatchmakingRuleSetResponse } from '../models/GameCenterMatchmakingRuleSetResponse';
import type { GameCenterMatchmakingRuleSetRulesLinkagesResponse } from '../models/GameCenterMatchmakingRuleSetRulesLinkagesResponse';
import type { GameCenterMatchmakingRuleSetsResponse } from '../models/GameCenterMatchmakingRuleSetsResponse';
import type { GameCenterMatchmakingRuleSetTeamsLinkagesResponse } from '../models/GameCenterMatchmakingRuleSetTeamsLinkagesResponse';
import type { GameCenterMatchmakingRuleSetUpdateRequest } from '../models/GameCenterMatchmakingRuleSetUpdateRequest';
import type { GameCenterMatchmakingRulesResponse } from '../models/GameCenterMatchmakingRulesResponse';
import type { GameCenterMatchmakingTeamsResponse } from '../models/GameCenterMatchmakingTeamsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameCenterMatchmakingRuleSetsService {
    /**
     * @param fieldsGameCenterMatchmakingRuleSets the fields to include for returned resources of type gameCenterMatchmakingRuleSets
     * @param fieldsGameCenterMatchmakingTeams the fields to include for returned resources of type gameCenterMatchmakingTeams
     * @param fieldsGameCenterMatchmakingRules the fields to include for returned resources of type gameCenterMatchmakingRules
     * @param fieldsGameCenterMatchmakingQueues the fields to include for returned resources of type gameCenterMatchmakingQueues
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @param limitMatchmakingQueues maximum number of related matchmakingQueues returned (when they are included)
     * @param limitRules maximum number of related rules returned (when they are included)
     * @param limitTeams maximum number of related teams returned (when they are included)
     * @returns GameCenterMatchmakingRuleSetsResponse List of GameCenterMatchmakingRuleSets
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsGetCollection(
        fieldsGameCenterMatchmakingRuleSets?: Array<'referenceName' | 'ruleLanguageVersion' | 'minPlayers' | 'maxPlayers' | 'teams' | 'rules' | 'matchmakingQueues'>,
        fieldsGameCenterMatchmakingTeams?: Array<'referenceName' | 'minPlayers' | 'maxPlayers'>,
        fieldsGameCenterMatchmakingRules?: Array<'referenceName' | 'description' | 'type' | 'expression' | 'weight'>,
        fieldsGameCenterMatchmakingQueues?: Array<'referenceName' | 'classicMatchmakingBundleIds' | 'ruleSet' | 'experimentRuleSet'>,
        limit?: number,
        include?: Array<'teams' | 'rules' | 'matchmakingQueues'>,
        limitMatchmakingQueues?: number,
        limitRules?: number,
        limitTeams?: number,
    ): CancelablePromise<GameCenterMatchmakingRuleSetsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets',
            query: {
                'fields[gameCenterMatchmakingRuleSets]': fieldsGameCenterMatchmakingRuleSets,
                'fields[gameCenterMatchmakingTeams]': fieldsGameCenterMatchmakingTeams,
                'fields[gameCenterMatchmakingRules]': fieldsGameCenterMatchmakingRules,
                'fields[gameCenterMatchmakingQueues]': fieldsGameCenterMatchmakingQueues,
                'limit': limit,
                'include': include,
                'limit[matchmakingQueues]': limitMatchmakingQueues,
                'limit[rules]': limitRules,
                'limit[teams]': limitTeams,
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
     * @param requestBody GameCenterMatchmakingRuleSet representation
     * @returns GameCenterMatchmakingRuleSetResponse Single GameCenterMatchmakingRuleSet
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsCreateInstance(
        requestBody: GameCenterMatchmakingRuleSetCreateRequest,
    ): CancelablePromise<GameCenterMatchmakingRuleSetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/gameCenterMatchmakingRuleSets',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                409: `Request entity error(s)`,
                422: `Unprocessable request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param fieldsGameCenterMatchmakingRuleSets the fields to include for returned resources of type gameCenterMatchmakingRuleSets
     * @param fieldsGameCenterMatchmakingTeams the fields to include for returned resources of type gameCenterMatchmakingTeams
     * @param fieldsGameCenterMatchmakingRules the fields to include for returned resources of type gameCenterMatchmakingRules
     * @param fieldsGameCenterMatchmakingQueues the fields to include for returned resources of type gameCenterMatchmakingQueues
     * @param include comma-separated list of relationships to include
     * @param limitMatchmakingQueues maximum number of related matchmakingQueues returned (when they are included)
     * @param limitRules maximum number of related rules returned (when they are included)
     * @param limitTeams maximum number of related teams returned (when they are included)
     * @returns GameCenterMatchmakingRuleSetResponse Single GameCenterMatchmakingRuleSet
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsGetInstance(
        id: string,
        fieldsGameCenterMatchmakingRuleSets?: Array<'referenceName' | 'ruleLanguageVersion' | 'minPlayers' | 'maxPlayers' | 'teams' | 'rules' | 'matchmakingQueues'>,
        fieldsGameCenterMatchmakingTeams?: Array<'referenceName' | 'minPlayers' | 'maxPlayers'>,
        fieldsGameCenterMatchmakingRules?: Array<'referenceName' | 'description' | 'type' | 'expression' | 'weight'>,
        fieldsGameCenterMatchmakingQueues?: Array<'referenceName' | 'classicMatchmakingBundleIds' | 'ruleSet' | 'experimentRuleSet'>,
        include?: Array<'teams' | 'rules' | 'matchmakingQueues'>,
        limitMatchmakingQueues?: number,
        limitRules?: number,
        limitTeams?: number,
    ): CancelablePromise<GameCenterMatchmakingRuleSetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterMatchmakingRuleSets]': fieldsGameCenterMatchmakingRuleSets,
                'fields[gameCenterMatchmakingTeams]': fieldsGameCenterMatchmakingTeams,
                'fields[gameCenterMatchmakingRules]': fieldsGameCenterMatchmakingRules,
                'fields[gameCenterMatchmakingQueues]': fieldsGameCenterMatchmakingQueues,
                'include': include,
                'limit[matchmakingQueues]': limitMatchmakingQueues,
                'limit[rules]': limitRules,
                'limit[teams]': limitTeams,
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
    /**
     * @param id the id of the requested resource
     * @param requestBody GameCenterMatchmakingRuleSet representation
     * @returns GameCenterMatchmakingRuleSetResponse Single GameCenterMatchmakingRuleSet
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsUpdateInstance(
        id: string,
        requestBody: GameCenterMatchmakingRuleSetUpdateRequest,
    ): CancelablePromise<GameCenterMatchmakingRuleSetResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                409: `Request entity error(s)`,
                422: `Unprocessable request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @returns void
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsDeleteInstance(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Parameter error(s)`,
                401: `Unauthorized error(s)`,
                403: `Forbidden error`,
                404: `Not found error`,
                409: `Request entity error(s)`,
                429: `Rate limit exceeded error`,
            },
        });
    }
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterMatchmakingRuleSetMatchmakingQueuesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsMatchmakingQueuesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingRuleSetMatchmakingQueuesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}/relationships/matchmakingQueues',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param fieldsGameCenterMatchmakingQueues the fields to include for returned resources of type gameCenterMatchmakingQueues
     * @param fieldsGameCenterMatchmakingRuleSets the fields to include for returned resources of type gameCenterMatchmakingRuleSets
     * @param limit maximum resources per page
     * @param include comma-separated list of relationships to include
     * @returns GameCenterMatchmakingQueuesResponse List of GameCenterMatchmakingQueues
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsMatchmakingQueuesGetToManyRelated(
        id: string,
        fieldsGameCenterMatchmakingQueues?: Array<'referenceName' | 'classicMatchmakingBundleIds' | 'ruleSet' | 'experimentRuleSet'>,
        fieldsGameCenterMatchmakingRuleSets?: Array<'referenceName' | 'ruleLanguageVersion' | 'minPlayers' | 'maxPlayers' | 'teams' | 'rules' | 'matchmakingQueues'>,
        limit?: number,
        include?: Array<'ruleSet' | 'experimentRuleSet'>,
    ): CancelablePromise<GameCenterMatchmakingQueuesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}/matchmakingQueues',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterMatchmakingQueues]': fieldsGameCenterMatchmakingQueues,
                'fields[gameCenterMatchmakingRuleSets]': fieldsGameCenterMatchmakingRuleSets,
                'limit': limit,
                'include': include,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterMatchmakingRuleSetRulesLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsRulesGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingRuleSetRulesLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}/relationships/rules',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param fieldsGameCenterMatchmakingRules the fields to include for returned resources of type gameCenterMatchmakingRules
     * @param limit maximum resources per page
     * @returns GameCenterMatchmakingRulesResponse List of GameCenterMatchmakingRules
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsRulesGetToManyRelated(
        id: string,
        fieldsGameCenterMatchmakingRules?: Array<'referenceName' | 'description' | 'type' | 'expression' | 'weight'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingRulesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}/rules',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterMatchmakingRules]': fieldsGameCenterMatchmakingRules,
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param limit maximum resources per page
     * @returns GameCenterMatchmakingRuleSetTeamsLinkagesResponse List of related linkages
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsTeamsGetToManyRelationship(
        id: string,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingRuleSetTeamsLinkagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}/relationships/teams',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
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
    /**
     * @param id the id of the requested resource
     * @param fieldsGameCenterMatchmakingTeams the fields to include for returned resources of type gameCenterMatchmakingTeams
     * @param limit maximum resources per page
     * @returns GameCenterMatchmakingTeamsResponse List of GameCenterMatchmakingTeams
     * @throws ApiError
     */
    public static gameCenterMatchmakingRuleSetsTeamsGetToManyRelated(
        id: string,
        fieldsGameCenterMatchmakingTeams?: Array<'referenceName' | 'minPlayers' | 'maxPlayers'>,
        limit?: number,
    ): CancelablePromise<GameCenterMatchmakingTeamsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/gameCenterMatchmakingRuleSets/{id}/teams',
            path: {
                'id': id,
            },
            query: {
                'fields[gameCenterMatchmakingTeams]': fieldsGameCenterMatchmakingTeams,
                'limit': limit,
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
