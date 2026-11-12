import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://branduminc.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/join/dashboard", "/join/profile"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

