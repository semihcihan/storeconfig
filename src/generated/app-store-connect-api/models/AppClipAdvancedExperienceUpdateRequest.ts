/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppClipAction } from './AppClipAction';
import type { AppClipAdvancedExperienceLanguage } from './AppClipAdvancedExperienceLanguage';
import type { AppClipAdvancedExperienceLocalizationInlineCreate } from './AppClipAdvancedExperienceLocalizationInlineCreate';
export type AppClipAdvancedExperienceUpdateRequest = {
    data: {
        type: AppClipAdvancedExperienceUpdateRequest.type;
        id: string;
        attributes?: {
            action?: AppClipAction;
            isPoweredBy?: boolean;
            place?: {
                placeId?: string;
                names?: Array<string>;
                mainAddress?: {
                    fullAddress?: string;
                    structuredAddress?: {
                        streetAddress?: Array<string>;
                        floor?: string;
                        neighborhood?: string;
                        locality?: string;
                        stateProvince?: string;
                        postalCode?: string;
                        countryCode?: string;
                    };
                };
                displayPoint?: {
                    coordinates?: {
                        latitude?: number;
                        longitude?: number;
                    };
                    source?: AppClipAdvancedExperienceUpdateRequest.source;
                };
                mapAction?: AppClipAdvancedExperienceUpdateRequest.mapAction;
                relationship?: AppClipAdvancedExperienceUpdateRequest.relationship;
                phoneNumber?: {
                    number?: string;
                    type?: AppClipAdvancedExperienceUpdateRequest.type;
                    intent?: string;
                };
                homePage?: string;
                categories?: Array<string>;
            };
            businessCategory?: AppClipAdvancedExperienceUpdateRequest.businessCategory;
            defaultLanguage?: AppClipAdvancedExperienceLanguage;
            removed?: boolean;
        };
        relationships?: {
            appClip?: {
                data?: {
                    type: AppClipAdvancedExperienceUpdateRequest.type;
                    id: string;
                };
            };
            headerImage?: {
                data?: {
                    type: AppClipAdvancedExperienceUpdateRequest.type;
                    id: string;
                };
            };
            localizations?: {
                data?: Array<{
                    type: 'appClipAdvancedExperienceLocalizations';
                    id: string;
                }>;
            };
        };
    };
    included?: Array<AppClipAdvancedExperienceLocalizationInlineCreate>;
};
export namespace AppClipAdvancedExperienceUpdateRequest {
    export enum type {
        APP_CLIP_ADVANCED_EXPERIENCES = 'appClipAdvancedExperiences',
    }
    export enum source {
        CALCULATED = 'CALCULATED',
        MANUALLY_PLACED = 'MANUALLY_PLACED',
    }
    export enum mapAction {
        BUY_TICKETS = 'BUY_TICKETS',
        VIEW_AVAILABILITY = 'VIEW_AVAILABILITY',
        VIEW_PRICING = 'VIEW_PRICING',
        HOTEL_BOOK_ROOM = 'HOTEL_BOOK_ROOM',
        PARKING_RESERVE_PARKING = 'PARKING_RESERVE_PARKING',
        RESTAURANT_JOIN_WAITLIST = 'RESTAURANT_JOIN_WAITLIST',
        RESTAURANT_ORDER_DELIVERY = 'RESTAURANT_ORDER_DELIVERY',
        RESTAURANT_ORDER_FOOD = 'RESTAURANT_ORDER_FOOD',
        RESTAURANT_ORDER_TAKEOUT = 'RESTAURANT_ORDER_TAKEOUT',
        RESTAURANT_RESERVATION = 'RESTAURANT_RESERVATION',
        SCHEDULE_APPOINTMENT = 'SCHEDULE_APPOINTMENT',
        RESTAURANT_VIEW_MENU = 'RESTAURANT_VIEW_MENU',
        THEATER_NOW_PLAYING = 'THEATER_NOW_PLAYING',
        AIRLINE_BOOK_TRAVEL = 'AIRLINE_BOOK_TRAVEL',
        AIRLINE_CHECK_IN = 'AIRLINE_CHECK_IN',
        AIRLINE_FLIGHT_STATUS = 'AIRLINE_FLIGHT_STATUS',
        APPLY = 'APPLY',
        BOOK = 'BOOK',
        BOOK_ACTIVITIES = 'BOOK_ACTIVITIES',
        BOOK_RIDES = 'BOOK_RIDES',
        BOOK_TEETIMES = 'BOOK_TEETIMES',
        BOOK_TOURS = 'BOOK_TOURS',
        CAREERS = 'CAREERS',
        CHARGE_EV = 'CHARGE_EV',
        COUPONS = 'COUPONS',
        DONATE = 'DONATE',
        EVENTS = 'EVENTS',
        EVENTS_SHOWS = 'EVENTS_SHOWS',
        EVENTS_SPORTS = 'EVENTS_SPORTS',
        GIFT_CARD = 'GIFT_CARD',
        HOTEL_AMENITIES = 'HOTEL_AMENITIES',
        JOIN = 'JOIN',
        PARKING_AVAILABLE = 'PARKING_AVAILABLE',
        RESTAURANT_PICKUP = 'RESTAURANT_PICKUP',
        RETAIL_SERVICE_QUOTE = 'RETAIL_SERVICE_QUOTE',
        RETAIL_STORE_DELIVERY = 'RETAIL_STORE_DELIVERY',
        RETAIL_STORE_PICKUP = 'RETAIL_STORE_PICKUP',
        RETAIL_STORE_SHOP = 'RETAIL_STORE_SHOP',
        SERVICES = 'SERVICES',
        SUPPORT = 'SUPPORT',
    }
    export enum relationship {
        OWNER = 'OWNER',
        AUTHORIZED = 'AUTHORIZED',
        OTHER = 'OTHER',
    }
    export enum businessCategory {
        AUTOMOTIVE = 'AUTOMOTIVE',
        BEAUTY = 'BEAUTY',
        BIKES = 'BIKES',
        BOOKS = 'BOOKS',
        CASINO = 'CASINO',
        EDUCATION = 'EDUCATION',
        EDUCATION_JAPAN = 'EDUCATION_JAPAN',
        ENTERTAINMENT = 'ENTERTAINMENT',
        EV_CHARGER = 'EV_CHARGER',
        FINANCIAL_USD = 'FINANCIAL_USD',
        FINANCIAL_CNY = 'FINANCIAL_CNY',
        FINANCIAL_GBP = 'FINANCIAL_GBP',
        FINANCIAL_JPY = 'FINANCIAL_JPY',
        FINANCIAL_EUR = 'FINANCIAL_EUR',
        FITNESS = 'FITNESS',
        FOOD_AND_DRINK = 'FOOD_AND_DRINK',
        GAS = 'GAS',
        GROCERY = 'GROCERY',
        HEALTH_AND_MEDICAL = 'HEALTH_AND_MEDICAL',
        HOTEL_AND_TRAVEL = 'HOTEL_AND_TRAVEL',
        MUSIC = 'MUSIC',
        PARKING = 'PARKING',
        PET_SERVICES = 'PET_SERVICES',
        PROFESSIONAL_SERVICES = 'PROFESSIONAL_SERVICES',
        SHOPPING = 'SHOPPING',
        TICKETING = 'TICKETING',
        TRANSIT = 'TRANSIT',
    }
}

