/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KidsAgeBand } from './KidsAgeBand';
import type { ResourceLinks } from './ResourceLinks';
export type AgeRatingDeclaration = {
    type: AgeRatingDeclaration.type;
    id: string;
    attributes?: {
        alcoholTobaccoOrDrugUseOrReferences?: AgeRatingDeclaration.alcoholTobaccoOrDrugUseOrReferences;
        contests?: AgeRatingDeclaration.contests;
        gambling?: boolean;
        gamblingSimulated?: AgeRatingDeclaration.gamblingSimulated;
        kidsAgeBand?: KidsAgeBand;
        lootBox?: boolean;
        medicalOrTreatmentInformation?: AgeRatingDeclaration.medicalOrTreatmentInformation;
        profanityOrCrudeHumor?: AgeRatingDeclaration.profanityOrCrudeHumor;
        sexualContentGraphicAndNudity?: AgeRatingDeclaration.sexualContentGraphicAndNudity;
        sexualContentOrNudity?: AgeRatingDeclaration.sexualContentOrNudity;
        horrorOrFearThemes?: AgeRatingDeclaration.horrorOrFearThemes;
        matureOrSuggestiveThemes?: AgeRatingDeclaration.matureOrSuggestiveThemes;
        unrestrictedWebAccess?: boolean;
        violenceCartoonOrFantasy?: AgeRatingDeclaration.violenceCartoonOrFantasy;
        violenceRealisticProlongedGraphicOrSadistic?: AgeRatingDeclaration.violenceRealisticProlongedGraphicOrSadistic;
        violenceRealistic?: AgeRatingDeclaration.violenceRealistic;
        koreaAgeRatingOverride?: AgeRatingDeclaration.koreaAgeRatingOverride;
    };
    links?: ResourceLinks;
};
export namespace AgeRatingDeclaration {
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

