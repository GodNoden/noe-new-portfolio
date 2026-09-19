import type { MetadataRoute } from 'next'
import { site } from './lib/site'

/**
 * Web app manifest. Next serves this at /manifest.webmanifest and links it
 * automatically, which is what gives meaning to the two PNG icons in `public/`
 * (home-screen installs, and the 512 px file doubles as a profile avatar).
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${site.name} — ${site.jobTitle}`,
        short_name: site.name,
        description: site.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#09090b',
        theme_color: '#09090b',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    }
}
