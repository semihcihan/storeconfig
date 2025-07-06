/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppMediaStateError } from './AppMediaStateError';
export type AppMediaAssetState = {
    errors?: Array<AppMediaStateError>;
    warnings?: Array<AppMediaStateError>;
    state?: AppMediaAssetState.state;
};
export namespace AppMediaAssetState {
    export enum state {
        AWAITING_UPLOAD = 'AWAITING_UPLOAD',
        UPLOAD_COMPLETE = 'UPLOAD_COMPLETE',
        COMPLETE = 'COMPLETE',
        FAILED = 'FAILED',
    }
}

