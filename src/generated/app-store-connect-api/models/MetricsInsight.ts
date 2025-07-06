/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetricCategory } from './MetricCategory';
export type MetricsInsight = {
    metricCategory?: MetricCategory;
    latestVersion?: string;
    metric?: string;
    summaryString?: string;
    referenceVersions?: string;
    maxLatestVersionValue?: number;
    subSystemLabel?: string;
    highImpact?: boolean;
    populations?: Array<{
        deltaPercentage?: number;
        percentile?: string;
        summaryString?: string;
        referenceAverageValue?: number;
        latestVersionValue?: number;
        device?: string;
    }>;
};

