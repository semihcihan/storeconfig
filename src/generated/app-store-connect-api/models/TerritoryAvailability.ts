/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceLinks } from './ResourceLinks';
export type TerritoryAvailability = {
    type: TerritoryAvailability.type;
    id: string;
    attributes?: {
        available?: boolean;
        releaseDate?: string;
        preOrderEnabled?: boolean;
        preOrderPublishDate?: string;
        contentStatuses?: Array<'AVAILABLE' | 'AVAILABLE_FOR_PREORDER_ON_DATE' | 'PROCESSING_TO_NOT_AVAILABLE' | 'PROCESSING_TO_AVAILABLE' | 'PROCESSING_TO_PRE_ORDER' | 'AVAILABLE_FOR_SALE_UNRELEASED_APP' | 'PREORDER_ON_UNRELEASED_APP' | 'AVAILABLE_FOR_PREORDER' | 'MISSING_RATING' | 'CANNOT_SELL_RESTRICTED_RATING' | 'BRAZIL_REQUIRED_TAX_ID' | 'MISSING_GRN' | 'UNVERIFIED_GRN' | 'ICP_NUMBER_INVALID' | 'ICP_NUMBER_MISSING' | 'TRADER_STATUS_NOT_PROVIDED' | 'TRADER_STATUS_VERIFICATION_FAILED' | 'TRADER_STATUS_VERIFICATION_STATUS_MISSING' | 'CANNOT_SELL_SEVENTEEN_PLUS_APPS' | 'CANNOT_SELL_SEXUALLY_EXPLICIT' | 'CANNOT_SELL_NON_IOS_GAMES' | 'CANNOT_SELL_SEVENTEEN_PLUS_GAMES' | 'CANNOT_SELL_CASINO' | 'CANNOT_SELL_CASINO_WITHOUT_GRAC' | 'CANNOT_SELL_CASINO_WITHOUT_AGE_VERIFICATION' | 'CANNOT_SELL_ADULT_ONLY' | 'CANNOT_SELL_GAMBLING_CONTESTS' | 'CANNOT_SELL_GAMBLING' | 'CANNOT_SELL_CONTESTS' | 'CANNOT_SELL'>;
    };
    relationships?: {
        territory?: {
            data?: {
                type: TerritoryAvailability.type;
                id: string;
            };
        };
    };
    links?: ResourceLinks;
};
export namespace TerritoryAvailability {
    export enum type {
        TERRITORY_AVAILABILITIES = 'territoryAvailabilities',
    }
}

