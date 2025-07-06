/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorLinks } from './ErrorLinks';
import type { ErrorSourceParameter } from './ErrorSourceParameter';
import type { ErrorSourcePointer } from './ErrorSourcePointer';
export type ErrorResponse = {
    errors?: Array<{
        id?: string;
        status: string;
        code: string;
        title: string;
        detail: string;
        source?: (ErrorSourcePointer | ErrorSourceParameter);
        links?: ErrorLinks;
        meta?: Record<string, any>;
    }>;
};

