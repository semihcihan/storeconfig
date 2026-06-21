export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://storeconfig.com",
  github: {
    repository:
      process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL ||
      "https://github.com/semihcihan/storeconfig",
    issues:
      process.env.NEXT_PUBLIC_GITHUB_ISSUES_URL ||
      "https://github.com/semihcihan/storeconfig/issues",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@example.com",
  },
} as const;
