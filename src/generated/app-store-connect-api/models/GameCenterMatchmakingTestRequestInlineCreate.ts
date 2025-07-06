/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from './Location';
import type { Platform } from './Platform';
export type GameCenterMatchmakingTestRequestInlineCreate = {
    type: GameCenterMatchmakingTestRequestInlineCreate.type;
    id?: string;
    attributes: {
        requestName: string;
        secondsInQueue: number;
        locale?: GameCenterMatchmakingTestRequestInlineCreate.locale;
        location?: Location;
        minPlayers?: number;
        maxPlayers?: number;
        playerCount?: number;
        bundleId: string;
        platform: Platform;
        appVersion: string;
    };
    relationships?: {
        matchmakingPlayerProperties?: {
            data?: Array<{
                type: 'gameCenterMatchmakingTestPlayerProperties';
                id: string;
            }>;
        };
    };
};
export namespace GameCenterMatchmakingTestRequestInlineCreate {
    export enum type {
        GAME_CENTER_MATCHMAKING_TEST_REQUESTS = 'gameCenterMatchmakingTestRequests',
    }
    export enum locale {
        AR_SA = 'AR-SA',
        CA_ES = 'CA-ES',
        CS_CZ = 'CS-CZ',
        DA_DK = 'DA-DK',
        DE_DE = 'DE-DE',
        EL_GR = 'EL-GR',
        EN_AU = 'EN-AU',
        EN_GB = 'EN-GB',
        EN_US = 'EN-US',
        EN_KY = 'EN-KY',
        ES_ES = 'ES-ES',
        ES_MX = 'ES-MX',
        FI_FI = 'FI-FI',
        FR_CA = 'FR-CA',
        FR_FR = 'FR-FR',
        HI_IN = 'HI-IN',
        HR_HR = 'HR-HR',
        HU_HU = 'HU-HU',
        ID_ID = 'ID-ID',
        IT_IT = 'IT-IT',
        IW_IL = 'IW-IL',
        JA_JP = 'JA-JP',
        KO_KR = 'KO-KR',
        MS_MY = 'MS-MY',
        NL_NL = 'NL-NL',
        NO_NO = 'NO-NO',
        PL_PL = 'PL-PL',
        PT_BR = 'PT-BR',
        PT_PT = 'PT-PT',
        RO_RO = 'RO-RO',
        RU_RU = 'RU-RU',
        SK_SK = 'SK-SK',
        SV_SE = 'SV-SE',
        TH_TH = 'TH-TH',
        TR_TR = 'TR-TR',
        UK_UA = 'UK-UA',
        ZH_CN = 'ZH-CN',
        ZH_TW = 'ZH-TW',
        ZH_HK = 'ZH-HK',
    }
}

