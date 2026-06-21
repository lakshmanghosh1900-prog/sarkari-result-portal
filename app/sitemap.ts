import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://your-domain.com",
      priority: 1,
    },

    {
      url: "https://your-domain.com/jobs",
      priority: 0.9,
    },

    {
      url: "https://your-domain.com/results",
      priority: 0.9,
    },

    {
      url: "https://your-domain.com/admit-card",
      priority: 0.9,
    },

    {
      url: "https://your-domain.com/answer-key",
      priority: 0.9,
    },
  ];
}