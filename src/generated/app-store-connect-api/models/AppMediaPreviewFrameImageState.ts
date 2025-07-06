/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaStateError } from './AppMediaStateError';
export type AppMediaPreviewFrameImageState = {
    errors?: Array<AppMediaStateError>;
    warnings?: Array<AppMediaStateError>;
    state?: AppMediaPreviewFrameImageState.state;
};
export namespace AppMediaPreviewFrameImageState {
    export enum state {
        PROCESSING = 'PROCESSING',
        COMPLETE = 'COMPLETE',
        FAILED = 'FAILED',
    }
}

