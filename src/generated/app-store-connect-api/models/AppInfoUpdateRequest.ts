/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppInfoUpdateRequest = {
    data: {
        type: AppInfoUpdateRequest.type;
        id: string;
        relationships?: {
            primaryCategory?: {
                data?: {
                    type: AppInfoUpdateRequest.type;
                    id: string;
                };
            };
            primarySubcategoryOne?: {
                data?: {
                    type: AppInfoUpdateRequest.type;
                    id: string;
                };
            };
            primarySubcategoryTwo?: {
                data?: {
                    type: AppInfoUpdateRequest.type;
                    id: string;
                };
            };
            secondaryCategory?: {
                data?: {
                    type: AppInfoUpdateRequest.type;
                    id: string;
                };
            };
            secondarySubcategoryOne?: {
                data?: {
                    type: AppInfoUpdateRequest.type;
                    id: string;
                };
            };
            secondarySubcategoryTwo?: {
                data?: {
                    type: AppInfoUpdateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppInfoUpdateRequest {
    export enum type {
        APP_INFOS = 'appInfos',
    }
}

