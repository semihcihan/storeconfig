/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BetaTesterInvitationCreateRequest = {
    data: {
        type: BetaTesterInvitationCreateRequest.type;
        relationships: {
            /**
             * @deprecated
             */
            betaTester?: {
                data?: {
                    type: BetaTesterInvitationCreateRequest.type;
                    id: string;
                };
            };
            app: {
                data: {
                    type: BetaTesterInvitationCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace BetaTesterInvitationCreateRequest {
    export enum type {
        BETA_TESTER_INVITATIONS = 'betaTesterInvitations',
    }
}

