/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEventAssetType } from './AppEventAssetType';
export type AppEventVideoClipCreateRequest = {
    data: {
        type: AppEventVideoClipCreateRequest.type;
        attributes: {
            fileSize: number;
            fileName: string;
            previewFrameTimeCode?: string;
            appEventAssetType: AppEventAssetType;
        };
        relationships: {
            appEventLocalization: {
                data: {
                    type: AppEventVideoClipCreateRequest.type;
                    id: string;
                };
            };
        };
    };
};
export namespace AppEventVideoClipCreateRequest {
    export enum type {
        APP_EVENT_VIDEO_CLIPS = 'appEventVideoClips',
    }
}

