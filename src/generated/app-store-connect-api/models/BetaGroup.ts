/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagingInformation } from './PagingInformation';
import type { RelationshipLinks } from './RelationshipLinks';
import type { ResourceLinks } from './ResourceLinks';
export type BetaGroup = {
    type: BetaGroup.type;
    id: string;
    attributes?: {
        name?: string;
        createdDate?: string;
        isInternalGroup?: boolean;
        hasAccessToAllBuilds?: boolean;
        publicLinkEnabled?: boolean;
        publicLinkId?: string;
        publicLinkLimitEnabled?: boolean;
        publicLinkLimit?: number;
        publicLink?: string;
        feedbackEnabled?: boolean;
        iosBuildsAvailableForAppleSiliconMac?: boolean;
        iosBuildsAvailableForAppleVision?: boolean;
    };
    relationships?: {
        app?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaGroup.type;
                id: string;
            };
        };
        builds?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'builds';
                id: string;
            }>;
        };
        betaTesters?: {
            links?: RelationshipLinks;
            meta?: PagingInformation;
            data?: Array<{
                type: 'betaTesters';
                id: string;
            }>;
        };
        betaRecruitmentCriteria?: {
            links?: RelationshipLinks;
            data?: {
                type: BetaGroup.type;
                id: string;
            };
        };
        betaRecruitmentCriterionCompatibleBuildCheck?: {
            links?: RelationshipLinks;
        };
    };
    links?: ResourceLinks;
};
export namespace BetaGroup {
    export enum type {
        BETA_GROUPS = 'betaGroups',
    }
}

