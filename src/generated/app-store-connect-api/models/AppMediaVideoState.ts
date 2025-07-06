/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaStateError } from './AppMediaStateError';
export type AppMediaVideoState = {
    errors?: Array<AppMediaStateError>;
    warnings?: Array<AppMediaStateError>;
    state?: AppMediaVideoState.state;
};
export namespace AppMediaVideoState {
    export enum state {
        AWAITING_UPLOAD = 'AWAITING_UPLOAD',
        UPLOAD_COMPLETE = 'UPLOAD_COMPLETE',
        PROCESSING = 'PROCESSING',
        COMPLETE = 'COMPLETE',
        FAILED = 'FAILED',
    }
}

