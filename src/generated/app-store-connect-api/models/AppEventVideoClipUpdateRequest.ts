/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AppEventVideoClipUpdateRequest = {
    data: {
        type: AppEventVideoClipUpdateRequest.type;
        id: string;
        attributes?: {
            previewFrameTimeCode?: string;
            uploaded?: boolean;
        };
    };
};
export namespace AppEventVideoClipUpdateRequest {
    export enum type {
        APP_EVENT_VIDEO_CLIPS = 'appEventVideoClips',
    }
}

