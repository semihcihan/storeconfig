const fs = require("fs");
const path = require("path");

// Import the config (we'll need to handle this differently since it's TypeScript)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://storeconfig.com";

const pages = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/docs", priority: "0.9", changefreq: "weekly" },
  { path: "/faq", priority: "0.8", changefreq: "monthly" },
  { path: "/privacy", priority: "0.1", changefreq: "yearly" },
  { path: "/schemas", priority: "0.7", changefreq: "weekly" },
  { path: "/terms", priority: "0.1", changefreq: "yearly" },
  { path: "/blog", priority: "0.1", changefreq: "weekly" },
  {
    path: "/blog/how-to-vibe-code-your-app-store-connect-setup",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/blog/optimize-app-store-pricing-with-ppp",
    priority: "0.9",
    changefreq: "monthly",
  },
];

const currentDate = new Date().toISOString().split("T")[0];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const publicDir = path.join(__dirname, "..", "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated at ${sitemapPath} with base URL: ${baseUrl}`);
};

const generateRobots = () => {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow specific paths if any (none currently)
# Disallow: /admin/
# Disallow: /private/`;

  const publicDir = path.join(__dirname, "..", "public");
  const robotsPath = path.join(publicDir, "robots.txt");

  fs.writeFileSync(robotsPath, robots);
  console.log(
    `Robots.txt generated at ${robotsPath} with base URL: ${baseUrl}`
  );
};

// Generate both files
generateSitemap();
generateRobots();
