/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProfileCreateRequest = {
    data: {
        type: ProfileCreateRequest.type;
        attributes: {
            name: string;
            profileType: ProfileCreateRequest.profileType;
        };
        relationships: {
            bundleId: {
                data: {
                    type: ProfileCreateRequest.type;
                    id: string;
                };
            };
            devices?: {
                data?: Array<{
                    type: 'devices';
                    id: string;
                }>;
            };
            certificates: {
                data: Array<{
                    type: 'certificates';
                    id: string;
                }>;
            };
        };
    };
};
export namespace ProfileCreateRequest {
    export enum type {
        PROFILES = 'profiles',
    }
    export enum profileType {
        IOS_APP_DEVELOPMENT = 'IOS_APP_DEVELOPMENT',
        IOS_APP_STORE = 'IOS_APP_STORE',
        IOS_APP_ADHOC = 'IOS_APP_ADHOC',
        IOS_APP_INHOUSE = 'IOS_APP_INHOUSE',
        MAC_APP_DEVELOPMENT = 'MAC_APP_DEVELOPMENT',
        MAC_APP_STORE = 'MAC_APP_STORE',
        MAC_APP_DIRECT = 'MAC_APP_DIRECT',
        TVOS_APP_DEVELOPMENT = 'TVOS_APP_DEVELOPMENT',
        TVOS_APP_STORE = 'TVOS_APP_STORE',
        TVOS_APP_ADHOC = 'TVOS_APP_ADHOC',
        TVOS_APP_INHOUSE = 'TVOS_APP_INHOUSE',
        MAC_CATALYST_APP_DEVELOPMENT = 'MAC_CATALYST_APP_DEVELOPMENT',
        MAC_CATALYST_APP_STORE = 'MAC_CATALYST_APP_STORE',
        MAC_CATALYST_APP_DIRECT = 'MAC_CATALYST_APP_DIRECT',
    }
}

