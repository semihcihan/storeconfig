/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ScmProviderType = {
    kind?: ScmProviderType.kind;
    displayName?: string;
    isOnPremise?: boolean;
};
export namespace ScmProviderType {
    export enum kind {
        BITBUCKET_CLOUD = 'BITBUCKET_CLOUD',
        BITBUCKET_SERVER = 'BITBUCKET_SERVER',
        GITHUB_CLOUD = 'GITHUB_CLOUD',
        GITHUB_ENTERPRISE = 'GITHUB_ENTERPRISE',
        GITLAB_CLOUD = 'GITLAB_CLOUD',
        GITLAB_SELF_MANAGED = 'GITLAB_SELF_MANAGED',
    }
}

