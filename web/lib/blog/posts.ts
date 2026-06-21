export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "optimize-app-store-pricing-with-ppp",
    title:
      "App Store Pricing Mistake Costing You 35% Revenue (Fix It in 5 Minutes)",
    description:
      "Learn how to maximize revenue and user acquisition globally using StoreConfig's set-price command with Purchasing Power Parity (PPP) strategy. See up to 35% revenue increase with fair, automated pricing.",
    publishedAt: "2025-01-22",
    updatedAt: "2025-01-22",
    authorName: "StoreConfig Team",
  },
  {
    slug: "how-to-vibe-code-your-app-store-connect-setup",
    title: "How to vibe code your App Store Connect setup",
    description:
      "Use AI to localize your app, create subscriptions and in-app purchases, and configure App Store Connect—all by editing a single JSON file. Fetch your current state, edit with AI, validate, and apply safely.",
    publishedAt: "2025-12-27",
    updatedAt: "2025-12-27",
    authorName: "StoreConfig Team",
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
