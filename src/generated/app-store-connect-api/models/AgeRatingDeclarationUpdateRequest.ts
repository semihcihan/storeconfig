/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KidsAgeBand } from './KidsAgeBand';
export type AgeRatingDeclarationUpdateRequest = {
    data: {
        type: AgeRatingDeclarationUpdateRequest.type;
        id: string;
        attributes?: {
            alcoholTobaccoOrDrugUseOrReferences?: AgeRatingDeclarationUpdateRequest.alcoholTobaccoOrDrugUseOrReferences;
            contests?: AgeRatingDeclarationUpdateRequest.contests;
            gambling?: boolean;
            gamblingSimulated?: AgeRatingDeclarationUpdateRequest.gamblingSimulated;
            kidsAgeBand?: KidsAgeBand;
            lootBox?: boolean;
            medicalOrTreatmentInformation?: AgeRatingDeclarationUpdateRequest.medicalOrTreatmentInformation;
            profanityOrCrudeHumor?: AgeRatingDeclarationUpdateRequest.profanityOrCrudeHumor;
            sexualContentGraphicAndNudity?: AgeRatingDeclarationUpdateRequest.sexualContentGraphicAndNudity;
            sexualContentOrNudity?: AgeRatingDeclarationUpdateRequest.sexualContentOrNudity;
            horrorOrFearThemes?: AgeRatingDeclarationUpdateRequest.horrorOrFearThemes;
            matureOrSuggestiveThemes?: AgeRatingDeclarationUpdateRequest.matureOrSuggestiveThemes;
            unrestrictedWebAccess?: boolean;
            violenceCartoonOrFantasy?: AgeRatingDeclarationUpdateRequest.violenceCartoonOrFantasy;
            violenceRealisticProlongedGraphicOrSadistic?: AgeRatingDeclarationUpdateRequest.violenceRealisticProlongedGraphicOrSadistic;
            violenceRealistic?: AgeRatingDeclarationUpdateRequest.violenceRealistic;
            koreaAgeRatingOverride?: AgeRatingDeclarationUpdateRequest.koreaAgeRatingOverride;
        };
    };
};
export namespace AgeRatingDeclarationUpdateRequest {
    export enum type {
        AGE_RATING_DECLARATIONS = 'ageRatingDeclarations',
    }
    export enum alcoholTobaccoOrDrugUseOrReferences {
        NONE = 'NONE',
    }
    export enum contests {
        NONE = 'NONE',
    }
    export enum gamblingSimulated {
        NONE = 'NONE',
    }
    export enum medicalOrTreatmentInformation {
        NONE = 'NONE',
    }
    export enum profanityOrCrudeHumor {
        NONE = 'NONE',
    }
    export enum sexualContentGraphicAndNudity {
        NONE = 'NONE',
    }
    export enum sexualContentOrNudity {
        NONE = 'NONE',
    }
    export enum horrorOrFearThemes {
        NONE = 'NONE',
    }
    export enum matureOrSuggestiveThemes {
        NONE = 'NONE',
    }
    export enum violenceCartoonOrFantasy {
        NONE = 'NONE',
    }
    export enum violenceRealisticProlongedGraphicOrSadistic {
        NONE = 'NONE',
    }
    export enum violenceRealistic {
        NONE = 'NONE',
    }
    export enum koreaAgeRatingOverride {
        NONE = 'NONE',
        FIFTEEN_PLUS = 'FIFTEEN_PLUS',
        NINETEEN_PLUS = 'NINETEEN_PLUS',
    }
}

