import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dvf-course.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/אודות`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/צרו_קשר`,
            lastModified: new Date(),
        },
    ]
}
