/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BuildBetaNotificationCreateRequest = {
    data: {
        type: BuildBetaNotificationCreateRequest.type;
        relationships: {
            build: {
                data: {
                    type: BuildBetaNotificationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BuildBetaNotificationCreateRequest {
    export enum type {
        BUILD_BETA_NOTIFICATIONS = 'buildBetaNotifications',
    }
}

