/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IconAssetType } from './IconAssetType';
import type { ImageAsset } from './ImageAsset';
import type { ResourceLinks } from './ResourceLinks';
export type BuildIcon = {
    type: BuildIcon.type;
    id: string;
    attributes?: {
        iconAsset?: ImageAsset;
        iconType?: IconAssetType;
        name?: string;
    };
    links?: ResourceLinks;
};
export namespace BuildIcon {
    export enum type {
        BUILD_ICONS = 'buildIcons',
    }
}

