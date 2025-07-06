/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetricCategory } from './MetricCategory';
import type { MetricsInsight } from './MetricsInsight';
export type xcodeMetrics = {
    version?: string;
    insights?: {
        trendingUp?: Array<MetricsInsight>;
        regressions?: Array<MetricsInsight>;
    };
    productData?: Array<{
        platform?: string;
        metricCategories?: Array<{
            identifier?: MetricCategory;
            metrics?: Array<{
                identifier?: string;
                goalKeys?: Array<{
                    goalKey?: string;
                    lowerBound?: number;
                    upperBound?: number;
                }>;
                unit?: {
                    identifier?: string;
                    displayName?: string;
                };
                datasets?: Array<{
                    filterCriteria?: {
                        percentile?: string;
                        device?: string;
                        deviceMarketingName?: string;
                    };
                    points?: Array<{
                        version?: string;
                        value?: number;
                        errorMargin?: number;
                        percentageBreakdown?: {
                            value?: number;
                            subSystemLabel?: string;
                        };
                        goal?: string;
                    }>;
                    recommendedMetricGoal?: {
                        value?: number;
                        detail?: string;
                    };
                }>;
            }>;
        }>;
    }>;
};

