const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://storeconfig.semihcihan.dev"
).replace(/\/$/, "");

export const config = {
  baseUrl,
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

export function siteUrl(path = "") {
  return `${config.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
