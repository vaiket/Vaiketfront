import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vaiket.com',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'https://vaiket.com/services',
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: 'https://vaiket.com/pricing',
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}
